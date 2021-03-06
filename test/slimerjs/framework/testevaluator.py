import os
import sys
import shutil
import subprocess
import webbrowser
from PIL import Image

class HTMLTableWriter:
	def __init__ (self, fileName, title):
		self.fileName = fileName
		self.title = title
	
	def WriteHeader (self):
		self.file = open (self.fileName, 'w')
		self.file.write ('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">\n');
		self.file.write ('<meta http-equiv="content-type" content="text/html;charset=utf-8">\n')
		self.file.write ('<html>\n');
		self.file.write ('<head>\n');
		self.file.write ('<title>' + self.title + '</title>\n');
		self.file.write ('<style>\n');
		self.file.write ('body{font-size:12px;font-family:arial;}\n');
		self.file.write ('table{border-collapse:collapse;}\n');
		self.file.write ('td{padding:5px 10px;border:1px solid #cccccc;}\n');
		self.file.write ('tr.header{color:#000000;background:#eeeeee;font-weight:bold;}\n');
		self.file.write ('tr.row{color:#000000;background:#ffffff;}\n');
		self.file.write ('span.succeeded{color:#00aa00;}\n');
		self.file.write ('span.failed{color:#aa0000;}\n');
		self.file.write ('</style>\n');
		self.file.write ('</head>\n');
		self.file.write ('<body>\n');

	def WriteTableHeader (self, parameters):
		self.file.write ('<table>\n');	
		self.file.write ('<tr class="header">\n')
		for parameter in parameters:
			self.file.write ('<td>' + parameter + '</td>')
		self.file.write ('</tr>\n'); 		
		
	def WriteTableRow (self, parameters):
		self.file.write ('<tr class="row">\n')
		for parameter in parameters:
			self.file.write ('<td>' + parameter + '</td>')
		self.file.write ('</tr>\n'); 		

	def WriteTableFooter (self):
		self.file.write ('</table>\n');
		
	def WriteFooter (self):
		self.file.write ('</body>\n');
		self.file.write ('</html>\n');
		self.file.close ()	

class Evaluator:
	def __init__ (self, workingDir, scriptPath, testRootUrl):
		self.workingDir = workingDir
		self.scriptPath = scriptPath
		self.testRootUrl = testRootUrl
		
		imagesPath = os.path.join (self.workingDir, 'images')
		if not os.path.exists (imagesPath):
			os.mkdir (imagesPath)

		self.refPath = os.path.join (imagesPath, 'ref')
		self.actPath = os.path.join (imagesPath, 'act')
		self.diffPath = os.path.join (imagesPath, 'diff')
		self.htmlPath = os.path.join (imagesPath, 'result.html')
	
	def Evaluate (self):
		print '-- clean up ---'
		self.CleanUp ()
		
		print '-- run tests ---'
		self.RunTests ()
		
		print '-- check results ---'
		self.Check ()		
	
	def CleanUp (self):
		if os.path.exists (self.actPath):
			shutil.rmtree (self.actPath)
		if os.path.exists (self.diffPath):
			shutil.rmtree (self.diffPath)
		if os.path.exists (self.htmlPath):
			os.remove (self.htmlPath)

	def RunTests (self):
		proc = subprocess.Popen (['slimerjs', self.scriptPath, self.testRootUrl, self.actPath], shell=True)
		out, err = proc.communicate ()

	def Check (self):
		def GetLink (text, rootPath, workingDir):
			href = os.path.relpath (workingDir, rootPath)
			href = href.replace ('\\', '/')
			return '<a href="' + href + '">' + text + '</a>'
			
		def GetSpan (text, className):
			return '<span class="' + className + '">' + text + '</span>'
		
		def CompareImages (refImagePath, actImagePath, diffImagePath, fileName, htmlDir):
			diffText = ''
			resultText = ''
			equalImages = False
			
			refImage = Image.open (refImagePath)
			actImage = Image.open (actImagePath)
			if refImage.size[0] != actImage.size[0] or refImage.size[1] != actImage.size[1]:
				print 'size mismatch for ' + fileName
				resultText = GetSpan ('size mismatch', 'failed')
			else:
				width = refImage.size[0]
				height = refImage.size[1]
				
				refData = refImage.load ()
				actData = actImage.load ()
				
				diffImage = Image.new ('RGBA', (width, height))
				diffData = diffImage.load ()
				
				diffCount = 0
				for i in range (0, width):
					for j in range (0, height):
						if refData[i, j] != actData[i, j]:
							diffData[i, j] = (255, 0, 0)
							diffCount += 1
						else:
							diffData[i, j] = (255, 255, 255)
				if diffCount > 0:
					diffDir = os.path.dirname (diffImagePath)
					if not os.path.exists (diffDir):
						os.mkdir (diffDir)
					diffImage.save (diffImagePath);			
					print 'difference found (' + str (diffCount) + ') for ' + fileName
					diffText = GetLink ('image', htmlDir, diffImagePath)
					resultText = GetSpan ('failed (' + str (diffCount) + ')', 'failed')
				else:
					resultText = GetSpan ('succeeded', 'succeeded')
					equalImages = True
			return diffText, resultText, equalImages
		
		fileList = []
		if os.path.exists (self.refPath):
			for fileName in os.listdir (self.refPath):
				if not fileName in fileList:
					fileList.append (fileName)
		if os.path.exists (self.actPath):
			for fileName in os.listdir (self.actPath):
				if not fileName in fileList:
					fileList.append (fileName)
		htmlDir = os.path.dirname (self.htmlPath)
		htmlTableWriter = HTMLTableWriter (self.htmlPath, 'Result')
		htmlTableWriter.WriteHeader ()
		htmlTableWriter.WriteTableHeader (['name', 'ref', 'act', 'diff', 'result'])
		
		succeeded = True
		for fileName in fileList:
			refImagePath = os.path.join (self.refPath, fileName)
			actImagePath = os.path.join (self.actPath, fileName)
			diffImagePath = os.path.join (self.diffPath, fileName)
			
			refExists = os.path.exists (refImagePath)
			actExists = os.path.exists (actImagePath)
			
			nameText = fileName
			refText = ''
			actText = ''
			diffText = ''
			resultText = ''
			
			if refExists:
				refText = GetLink ('image', htmlDir, refImagePath)
			if actExists:
				actText = GetLink ('image', htmlDir, actImagePath)
				
			if not refExists:
				print 'missing reference image for ' + fileName
				resultText =  GetSpan ('missing reference image', 'failed')
				succeeded = False
			elif not actExists:
				print 'missing actual image for ' + fileName
				resultText = GetSpan ('missing actual image', 'failed')
				succeeded = False
			else:
				diffText, resultText, equalImages = CompareImages (refImagePath, actImagePath, diffImagePath, fileName, htmlDir)
				if not equalImages:
					succeeded = False
			htmlTableWriter.WriteTableRow ([nameText, refText, actText, diffText, resultText])
		htmlTableWriter.WriteTableFooter ()
		htmlTableWriter.WriteFooter ()
		if succeeded:
			print 'everything is ok'
		else:
			print 'some tests failed'
			webbrowser.open (self.htmlPath)
