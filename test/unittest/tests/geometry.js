module.exports = function (unitTest)
{

var generalSuite = unitTest.AddTestSuite ('GeometryGeneral');

generalSuite.AddTest ('Vector2DTest', function (test) {
	var coord1 = new JSM.Coord2D (1.0, 0.0);
	var coord2 = new JSM.Coord2D (0.0, 1.0);
	test.Assert (JSM.CoordAdd2D (coord1, coord2).IsEqual (new JSM.Coord2D (1, 1)));
	test.Assert (JSM.IsEqual (coord1.DistanceTo (coord2), Math.sqrt (2.0)));
	test.Assert (JSM.MidCoord2D (coord1, coord2).IsEqual (new JSM.Coord2D (0.5, 0.5)));
	var coord3 = coord1.Clone ().MultiplyScalar (10);
	test.Assert (coord3.IsEqual (new JSM.Coord2D (10, 0)));
	test.Assert (JSM.IsEqual (coord3.Length (), 10.0));
	var coord4 = coord3.Clone ().Normalize ();
	test.Assert (coord3.IsEqual (new JSM.Coord2D (10, 0)));
	test.Assert (coord4.IsEqual (new JSM.Coord2D (1, 0)));
	test.Assert (JSM.IsEqual (coord4.Length (), 1.0));
	var coord5 = coord3.Clone ().SetLength (5);
	test.Assert (coord3.IsEqual (new JSM.Coord2D (10, 0)));
	test.Assert (coord5.IsEqual (new JSM.Coord2D (5, 0)));
	test.Assert (JSM.IsEqual (coord5.Length (), 5.0));
	var coord6 = coord1.Clone ().Offset (coord2, 3.0);
	test.Assert (coord1.IsEqual (new JSM.Coord2D (1, 0)));
	test.Assert (coord6.IsEqual (new JSM.Coord2D (1, 3)));
	var coord7 = coord3.Normalize ();
	test.Assert (coord3.IsEqual (new JSM.Coord2D (1, 0)));
	test.Assert (coord7.IsEqual (new JSM.Coord2D (1, 0)));
	
	var origo = new JSM.Coord2D (0.0, 0.0);
	var rotated = coord1.Clone ().Rotate (Math.PI / 2.0, origo);
	test.Assert (rotated.IsEqual (new JSM.Coord2D (0, 1)));
	var rotated = coord1.Clone ().Rotate (Math.PI, origo);
	test.Assert (rotated.IsEqual (new JSM.Coord2D (-1, 0)));
	var rotated = coord1.Clone ().Rotate (Math.PI * 3.0 / 2.0, origo);
	test.Assert (rotated.IsEqual (new JSM.Coord2D (0, -1)));
	var rotated = coord1.Clone ().Rotate (Math.PI * 2.0, origo);
	test.Assert (rotated.IsEqual (new JSM.Coord2D (1, 0)));

	var origo = new JSM.Coord2D (-1.0, 0.0);
	var rotated = coord1.Clone ().Rotate (Math.PI / 2.0, origo);
	test.Assert (rotated.IsEqual (new JSM.Coord2D (-1, 2)));
	var rotated = coord1.Clone ().Rotate (Math.PI, origo);
	test.Assert (rotated.IsEqual (new JSM.Coord2D (-3, 0)));
	var rotated = coord1.Clone ().Rotate (Math.PI * 3.0 / 2.0, origo);
	test.Assert (rotated.IsEqual (new JSM.Coord2D (-1, -2)));
	var rotated = coord1.Clone ().Rotate (Math.PI * 2.0, origo);
	test.Assert (rotated.IsEqual (new JSM.Coord2D (1, 0)));
});

generalSuite.AddTest ('VectorTest', function (test) {
	var coord2d1 = new JSM.Coord2D (1, 2);
	var coord2d2 = new JSM.Coord2D (3, 4);
	var coord2d3 = new JSM.Coord2D (1, 6);

	test.Assert (coord2d1.IsEqual (new JSM.Coord2D (1, 2)));
	test.Assert (JSM.MidCoord2D (coord2d1, coord2d2).IsEqual (new JSM.Coord2D (2, 3)));
	test.Assert (JSM.IsEqual (coord2d1.DistanceTo (coord2d2), 2.8284271247));
	test.Assert (JSM.CoordOrientation2D (coord2d1, coord2d2, coord2d3) == JSM.Orientation.CounterClockwise);

	var coord1 = new JSM.Coord (1, 2, 3);
	var coord2 = new JSM.Coord (4, 5, 6);

	test.Assert (coord1.IsEqual (new JSM.Coord (1, 2, 3)));
	test.Assert (JSM.MidCoord (coord1, coord2).IsEqual (new JSM.Coord (2.5, 3.5, 4.5)));
	test.Assert (coord1.Clone ().MultiplyScalar (3).IsEqual (new JSM.Coord (3, 6, 9)));
	test.Assert (JSM.IsEqual (JSM.VectorDot (coord1, coord2), 32));
	test.Assert (JSM.VectorCross (coord1, coord2).IsEqual (new JSM.Coord (-3, 6, -3)));
	test.Assert (JSM.IsEqual (coord1.Length (), 3.7416573867));
	test.Assert (coord1.Clone ().Normalize ().IsEqual (new JSM.Coord (0.2672612419, 0.5345224838, 0.8017837257)));
	test.Assert (JSM.IsEqual (coord1.Clone ().SetLength (123).Length (), 123));
	test.Assert (JSM.IsEqual (coord1.DistanceTo (coord2), 5.1961524227));
	test.Assert (JSM.CoordAdd (coord1, coord2).IsEqual (new JSM.Coord (5, 7, 9)));
	test.Assert (JSM.CoordSub (coord1, coord2).IsEqual (new JSM.Coord (-3, -3, -3)));
	test.Assert (coord2.Clone ().Offset (coord1, 5.0).IsEqual (new JSM.Coord (5.3363062095, 7.672612419, 10.0089186285)));
	
	test.Assert (coord1.Clone ().Offset (new JSM.Coord (1.0, 0.0, 0.0), 5.0).IsEqual (new JSM.Coord (6.0, 2.0, 3.0)));
	test.Assert (coord1.Clone ().Offset (new JSM.Coord (0.0, 1.0, 0.0), 5.0).IsEqual (new JSM.Coord (1.0, 7.0, 3.0)));
	test.Assert (coord1.Clone ().Offset (new JSM.Coord (0.0, 0.0, 1.0), 5.0).IsEqual (new JSM.Coord (1.0, 2.0, 8.0)));

	var coord = new JSM.Coord (1.0, 1.0, 1.0);
	var direction = new JSM.Vector (1.0, 0.0, 0.0);
	test.Assert (coord.Clone ().Offset (direction, 1.0).IsEqual (new JSM.Coord (2.0, 1.0, 1.0)));
	
	var coord = new JSM.Coord (1.0, 1.0, 1.0);
	var axis = new JSM.Vector (0.0, 0.0, 1.0);
	var origo = new JSM.Vector (0.0, 0.0, 0.0);
	var angle = 90.0 * JSM.DegRad;
	test.Assert (coord.Clone ().Rotate (axis, angle, origo).IsEqual (new JSM.Coord (-1.0, 1.0, 1.0)));

	var vector1 = new JSM.Vector (1.0, 0.0, 0.0);
	var vector2 = new JSM.Vector (0.0, 1.0, 0.0);
	test.Assert (JSM.IsEqual (vector1.AngleTo (vector2), 90.0 * JSM.DegRad));

	var vector = new JSM.Vector (1.0, 0.0, 0.0);
	test.Assert (JSM.IsEqual (vector.Length (), 1.0));
	
	var vector = new JSM.Vector (1.0, 2.0, 3.0);
	var multiplied = vector.Clone ().MultiplyScalar (2.0);
	test.Assert (multiplied.IsEqual (new JSM.Coord (2.0, 4.0, 6.0)));
	
	var vector = new JSM.Vector (10.0, 0.0, 0.0);
	var normal = vector.Clone ().Normalize ();
	test.Assert (normal.IsEqual (new JSM.Coord (1.0, 0.0, 0.0)));
	
	var another = vector.Clone ().SetLength (5.0);
	test.Assert (another.IsEqual (new JSM.Coord (5.0, 0.0, 0.0)));

	var cartesian = JSM.SphericalToCartesian (1.0, 0.0, 90.0 * JSM.DegRad);
	test.Assert (cartesian.IsEqual (new JSM.Coord (0.0, 0.0, 1.0)));

	var cartesian = JSM.CylindricalToCartesian (1.0, 1.0, 90.0 * JSM.DegRad);
	test.Assert (cartesian.IsEqual (new JSM.Coord (0.0, 1.0, 1.0)));

	var coord = new JSM.Coord (1.0, 2.0, 3.0);
	var normal = new JSM.Coord (0.0, 1.0, 0.0);
	var coord2D = coord.ToCoord2D (normal);
	test.Assert (coord.IsEqual (new JSM.Coord (1.0, 2.0, 3.0)));
	test.Assert (coord2D.IsEqual (new JSM.Coord2D (1.0, -3.0)));

	var coords = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0)
	];
	var normal = JSM.CalculateNormal (coords);
	test.Assert (normal.IsEqual (new JSM.Coord (0.0, 0.0, 1.0)));
	var centroid = JSM.CalculateCentroid (coords);
	test.Assert (centroid.IsEqual (new JSM.Coord (0.5, 0.5, 0.0)));
	
	var coords2 = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (0.5, 0.5, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0)
	];
	var normal2 = JSM.CalculateNormal (coords2);
	test.Assert (normal2.IsEqual (new JSM.Coord (0.0, 0.0, 1.0)));
	var centroid2 = JSM.CalculateCentroid (coords2);
	test.Assert (centroid2.IsEqual (new JSM.Coord (0.5, 0.5, 0.0)));

	var coords3 = [
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.5, 0.5, 0.0),
		new JSM.Coord (0.5, 0.5, 0.0),
		new JSM.Coord (0.5, 0.5, 0.0),
		new JSM.Coord (0.0, 0.0, 0.0)
	];
	var normal3 = JSM.CalculateNormal (coords3);
	test.Assert (normal3.IsEqual (new JSM.Coord (0.0, 0.0, -1.0)));
	var centroid3 = JSM.CalculateCentroid (coords3);
	test.Assert (centroid3.IsEqual (new JSM.Coord (0.3, 0.5, 0.0)));

	var vector1 = new JSM.Vector (1.0, 0.0, 0.0);
	var vector2 = new JSM.Vector (0.0, 1.0, 0.0);
	test.Assert (JSM.IsEqual (vector1.AngleTo (vector2), Math.PI / 2.0));
	test.Assert (JSM.IsEqual (vector2.AngleTo (vector1), Math.PI / 2.0));

	var coord1 = new JSM.Vector (0.0, 0.0, 0.0);
	var coord2 = new JSM.Vector (1.0, 0.0, 0.0);
	var coord3 = new JSM.Vector (0.0, 1.0, 0.0);
	var normal1 = new JSM.Vector (0.0, 0.0, 1.0);
	var normal2 = new JSM.Vector (0.0, 0.0, -1.0);
	var normal3 = new JSM.Vector (0.0, -1.0, -1.0);

	test.Assert (JSM.CoordOrientation (coord1, coord2, coord3, normal1) == JSM.Orientation.CounterClockwise);
	test.Assert (JSM.CoordOrientation (coord1, coord3, coord2, normal1) == JSM.Orientation.Clockwise);
	test.Assert (JSM.CoordOrientation (coord1, coord3, coord3, normal1) == JSM.Orientation.Invalid);

	test.Assert (JSM.CoordOrientation (coord1, coord2, coord3, normal2) == JSM.Orientation.Clockwise);
	test.Assert (JSM.CoordOrientation (coord1, coord3, coord2, normal2) == JSM.Orientation.CounterClockwise);
	test.Assert (JSM.CoordOrientation (coord1, coord3, coord3, normal2) == JSM.Orientation.Invalid);

	test.Assert (JSM.CoordOrientation (coord1, coord2, coord3, normal3) == JSM.Orientation.Clockwise);
	test.Assert (JSM.CoordOrientation (coord1, coord3, coord2, normal3) == JSM.Orientation.CounterClockwise);
	test.Assert (JSM.CoordOrientation (coord1, coord3, coord3, normal3) == JSM.Orientation.Invalid);

	var coord1 = new JSM.Vector (0.0, 0.0, 0.0);
	var coord2 = new JSM.Vector (1.0, 0.0, 0.0);
	var coord3 = new JSM.Vector (0.0, 0.0, 1.0);
	var normal1 = new JSM.Vector (0.0, 1.0, 0.0);
	var normal2 = new JSM.Vector (0.0, -1.0, 0.0);

	test.Assert (JSM.CoordOrientation (coord1, coord2, coord3, normal2) == JSM.Orientation.CounterClockwise);
	test.Assert (JSM.CoordOrientation (coord1, coord3, coord2, normal2) == JSM.Orientation.Clockwise);
	test.Assert (JSM.CoordOrientation (coord1, coord3, coord3, normal2) == JSM.Orientation.Invalid);

	test.Assert (JSM.CoordOrientation (coord1, coord2, coord3, normal1) == JSM.Orientation.Clockwise);
	test.Assert (JSM.CoordOrientation (coord1, coord3, coord2, normal1) == JSM.Orientation.CounterClockwise);
	test.Assert (JSM.CoordOrientation (coord1, coord3, coord3, normal1) == JSM.Orientation.Invalid);
	
	var coord1 = new JSM.Vector (0.0, 0.0, 0.0);
	var coord2 = new JSM.Vector (1.0, 0.0, 0.0);
	var coord3 = new JSM.Vector (-1.0, 0.0, 0.0);
	test.Assert (JSM.IsEqual (JSM.CoordSignedDistance (coord1, coord2, JSM.CoordSub (coord2, coord1)), 1.0));
	test.Assert (JSM.IsEqual (JSM.CoordSignedDistance (coord1, coord3, JSM.CoordSub (coord1, coord3)), -1.0));
	
	var coord = new JSM.Coord2D (1.0, 2.0);
	test.Assert (!coord.IsEqualWithEps (new JSM.Coord2D (1.0, 3.0), 0.1));
	test.Assert (!coord.IsEqualWithEps (new JSM.Coord2D (2.0, 2.0), 0.1));
	test.Assert (coord.IsEqualWithEps (new JSM.Coord2D (1.0, 3.0), 1.1));
	test.Assert (coord.IsEqualWithEps (new JSM.Coord2D (2.0, 2.0), 1.1));

	var coord = new JSM.Coord (1.0, 2.0, 3.0);
	test.Assert (!coord.IsEqualWithEps (new JSM.Coord (1.0, 2.0, 4.0), 0.1));
	test.Assert (!coord.IsEqualWithEps (new JSM.Coord (1.0, 3.0, 3.0), 0.1));
	test.Assert (!coord.IsEqualWithEps (new JSM.Coord (2.0, 2.0, 3.0), 0.1));
	test.Assert (coord.IsEqualWithEps (new JSM.Coord (1.0, 2.0, 4.0), 1.1));
	test.Assert (coord.IsEqualWithEps (new JSM.Coord (1.0, 3.0, 3.0), 1.1));
	test.Assert (coord.IsEqualWithEps (new JSM.Coord (2.0, 2.0, 3.0), 1.1));
});

generalSuite.AddTest ('TriangleNormalTest', function (test) {
	test.Assert (JSM.CalculateTriangleNormal (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0), new JSM.Coord (1.0, 1.0, 0.0)).IsEqual (new JSM.Vector (0.0, 0.0, 1.0)));
	test.Assert (JSM.CalculateTriangleNormal (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0), new JSM.Coord (1.0, -1.0, 0.0)).IsEqual (new JSM.Vector (0.0, 0.0, -1.0)));
	
	test.Assert (JSM.CalculateTriangleNormal (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (0.0, 1.0, 0.0), new JSM.Coord (0.0, 1.0, 1.0)).IsEqual (new JSM.Vector (1.0, 0.0, 0.0)));
	test.Assert (JSM.CalculateTriangleNormal (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (0.0, 1.0, 0.0), new JSM.Coord (0.0, 1.0, -1.0)).IsEqual (new JSM.Vector (-1.0, 0.0, 0.0)));

	test.Assert (JSM.CalculateTriangleNormal (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, -1.0)).IsEqual (new JSM.Vector (0.0, 1.0, 0.0)));
	test.Assert (JSM.CalculateTriangleNormal (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, 1.0)).IsEqual (new JSM.Vector (0.0, -1.0, 0.0)));
});

generalSuite.AddTest ('BarycentricInterpolation', function (test) {
	var vertex0 = new JSM.Coord (0, 0, 0);
	var vertex1 = new JSM.Coord (1, 0, 0);
	var vertex2 = new JSM.Coord (1, 1, 0);
	var value0 = new JSM.Coord (0, 0, 0);
	var value1 = new JSM.Coord (1, 0, 0);
	var value2 = new JSM.Coord (1, 1, 0);

	var result = JSM.BarycentricInterpolation (vertex0, vertex1, vertex2, value0, value1, value2, new JSM.Coord (0, 0, 0));
	test.Assert (result.IsEqual (new JSM.Coord (0, 0, 0)));
	var result = JSM.BarycentricInterpolation (vertex0, vertex1, vertex2, value0, value1, value2, new JSM.Coord (0.6, 0.4, 0));
	test.Assert (result.IsEqual (new JSM.Coord (0.6, 0.4, 0)));

	var value0 = new JSM.Coord (1, 1, 1);
	var value1 = new JSM.Coord (5, 5, 5);
	var value2 = new JSM.Coord (100, 100, 100);
	var result = JSM.BarycentricInterpolation (vertex0, vertex1, vertex2, value0, value1, value2, new JSM.Coord (0, 0, 0));
	test.Assert (result.IsEqual (new JSM.Coord (1, 1, 1)));
	var result = JSM.BarycentricInterpolation (vertex0, vertex1, vertex2, value0, value1, value2, new JSM.Coord (1, 0, 0));
	test.Assert (result.IsEqual (new JSM.Coord (5, 5, 5)));
	var result = JSM.BarycentricInterpolation (vertex0, vertex1, vertex2, value0, value1, value2, new JSM.Coord (1, 1, 0));
	test.Assert (result.IsEqual (new JSM.Coord (100, 100, 100)));
	var result = JSM.BarycentricInterpolation (vertex0, vertex1, vertex2, value0, value1, value2, new JSM.Coord (0.5, 0.5, 0));
	test.Assert (result.IsEqual (new JSM.Coord (50.5, 50.5, 50.5)));
	var result = JSM.BarycentricInterpolation (vertex0, vertex1, vertex2, value0, value1, value2, new JSM.Coord (0.8, 0.8, 0));
	test.Assert (result.IsEqual (new JSM.Coord (80.2, 80.2, 80.2)));
});

generalSuite.AddTest ('CircleTest', function (test) {
	test.Assert (JSM.PolarToCartesian (1.0, 0.0 * JSM.DegRad).IsEqual (new JSM.Coord2D (1.0, 0.0)));
	test.Assert (JSM.PolarToCartesian (1.0, 90.0 * JSM.DegRad).IsEqual (new JSM.Coord2D (0.0, 1.0)));
	test.Assert (JSM.PolarToCartesian (1.0, 180.0 * JSM.DegRad).IsEqual (new JSM.Coord2D (-1.0, 0.0)));
	test.Assert (JSM.PolarToCartesian (1.0, 270.0 * JSM.DegRad).IsEqual (new JSM.Coord2D (0.0, -1.0)));
	test.Assert (JSM.PolarToCartesian (1.0, 360.0 * JSM.DegRad).IsEqual (new JSM.Coord2D (1.0, 0.0)));
	test.Assert (JSM.PolarToCartesian (1.0, 450.0 * JSM.DegRad).IsEqual (new JSM.Coord2D (0.0, 1.0)));
	
	var unitRadius = 2.0 * 1.0 * Math.PI;
	test.Assert (JSM.IsEqual (JSM.GetArcLengthFromAngle (1.0, 0.0 * JSM.DegRad), 0.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLengthFromAngle (1.0, 90.0 * JSM.DegRad), unitRadius / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLengthFromAngle (1.0, 180.0 * JSM.DegRad), unitRadius / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLengthFromAngle (1.0, 270.0 * JSM.DegRad), 3.0 * unitRadius / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLengthFromAngle (1.0, 360.0 * JSM.DegRad), unitRadius));
	test.Assert (JSM.IsEqual (JSM.GetArcLengthFromAngle (1.0, 450.0 * JSM.DegRad), 5.0 * unitRadius / 4.0));
	
	test.Assert (JSM.IsEqual (JSM.GetAngleFromArcLength (1.0, 0.0), 0.0 * JSM.DegRad));
	test.Assert (JSM.IsEqual (JSM.GetAngleFromArcLength (1.0, unitRadius / 4.0), 90.0 * JSM.DegRad));
	test.Assert (JSM.IsEqual (JSM.GetAngleFromArcLength (1.0, unitRadius / 2.0), 180.0 * JSM.DegRad));
	test.Assert (JSM.IsEqual (JSM.GetAngleFromArcLength (1.0, 3.0 * unitRadius / 4.0), 270.0 * JSM.DegRad));
	test.Assert (JSM.IsEqual (JSM.GetAngleFromArcLength (1.0, unitRadius), 360.0 * JSM.DegRad));
	test.Assert (JSM.IsEqual (JSM.GetAngleFromArcLength (1.0, 5.0 * unitRadius / 4.0), 450.0 * JSM.DegRad));
});

generalSuite.AddTest ('MatrixTest', function (test) {
	var vector1 = [1, 2, 3, 4];
	var matrix1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
	var matrix2 = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
	
	var a = JSM.MatrixVectorMultiply (matrix1, JSM.MatrixVectorMultiply (matrix2, vector1));
	var b = JSM.MatrixVectorMultiply (JSM.MatrixMultiply (matrix2, matrix1), vector1);
	test.Assert (a.toString () == b.toString ());
	
	var vector2 = JSM.MatrixVectorMultiply (matrix1, vector1);
	var matrix3 = JSM.MatrixMultiply (matrix1, matrix2);
	
	test.Assert (vector2[0] == 90);
	test.Assert (vector2[1] == 100);
	test.Assert (vector2[2] == 110);
	test.Assert (vector2[3] == 120);

	test.Assert (matrix3[0] == 250);
	test.Assert (matrix3[1] == 260);
	test.Assert (matrix3[2] == 270);
	test.Assert (matrix3[3] == 280);
	test.Assert (matrix3[4] == 618);
	test.Assert (matrix3[5] == 644);
	test.Assert (matrix3[6] == 670);
	test.Assert (matrix3[7] == 696);
	test.Assert (matrix3[8] == 986);
	test.Assert (matrix3[9] == 1028);
	test.Assert (matrix3[10] == 1070);
	test.Assert (matrix3[11] == 1112);
	test.Assert (matrix3[12] == 1354);
	test.Assert (matrix3[13] == 1412);
	test.Assert (matrix3[14] == 1470);
	test.Assert (matrix3[15] == 1528);
	
	var vector = [1, 1, 1, 0];
	var rotX = JSM.MatrixRotationX (90 * JSM.DegRad);
	var rotXVec = JSM.MatrixVectorMultiply (rotX, vector);
	var rotXVec2 = JSM.ApplyTransformation (rotX, JSM.CoordFromArray (vector));
	var rotY = JSM.MatrixRotationY (90 * JSM.DegRad);
	var rotYVec = JSM.MatrixVectorMultiply (rotY, vector);
	var rotYVec2 = JSM.ApplyTransformation (rotY, JSM.CoordFromArray (vector));
	var rotZ = JSM.MatrixRotationZ (90 * JSM.DegRad);
	var rotZVec = JSM.MatrixVectorMultiply (rotZ, vector);
	var rotZVec2 = JSM.ApplyTransformation (rotZ, JSM.CoordFromArray (vector));

	test.Assert (JSM.IsEqual (rotXVec[0], 1.0));
	test.Assert (JSM.IsEqual (rotXVec[1], -1.0));
	test.Assert (JSM.IsEqual (rotXVec[2], 1.0));
	test.Assert (JSM.IsEqual (rotXVec[3], 0.0));

	test.Assert (JSM.IsEqual (rotXVec2.x, 1.0));
	test.Assert (JSM.IsEqual (rotXVec2.y, -1.0));
	test.Assert (JSM.IsEqual (rotXVec2.z, 1.0));

	test.Assert (JSM.IsEqual (rotYVec[0], 1.0));
	test.Assert (JSM.IsEqual (rotYVec[1], 1.0));
	test.Assert (JSM.IsEqual (rotYVec[2], -1.0));
	test.Assert (JSM.IsEqual (rotYVec[3], 0.0));

	test.Assert (JSM.IsEqual (rotYVec2.x, 1.0));
	test.Assert (JSM.IsEqual (rotYVec2.y, 1.0));
	test.Assert (JSM.IsEqual (rotYVec2.z, -1.0));

	test.Assert (JSM.IsEqual (rotZVec[0], -1.0));
	test.Assert (JSM.IsEqual (rotZVec[1], 1.0));
	test.Assert (JSM.IsEqual (rotZVec[2], 1.0));
	test.Assert (JSM.IsEqual (rotZVec[3], 0.0));

	test.Assert (JSM.IsEqual (rotZVec2.x, -1.0));
	test.Assert (JSM.IsEqual (rotZVec2.y, 1.0));
	test.Assert (JSM.IsEqual (rotZVec2.z, 1.0));
	
	var matrix = [
		1, 0, 0, 1,
		0, 2, 1, 2,
		2, 1, 0, 1,
		2, 0, 1, 4
	];
	
	var inverse = JSM.MatrixInvert (matrix);
	test.Assert (inverse.toString () == [
		-2, -0.5, 1, 0.5,
		1, 0.5, 0, -0.5,
		-8, -1, 2, 2,
		3, 0.5, -1, -0.5
	].toString ());
	
	var transposed = JSM.MatrixTranspose (matrix1);
	test.Assert ([
		1, 5, 9, 13,
		2, 6, 10, 14,
		3, 7, 11, 15,
		4, 8, 12, 16
	].toString () == transposed.toString ());
});

generalSuite.AddTest ('ArcLengthTest', function (test) {
	var a1 = new JSM.Vector (0.0, 1.0, 0.0);
	var a2 = new JSM.Vector (0.0, -1.0, 0.0);
	var a3 = new JSM.Vector (-1.0, 0.0, 0.0);
	var a4 = new JSM.Vector (1.0, 1.0, 0.0);
	var a5 = new JSM.Vector (1.0, -1.0, 0.0);
	
	var b1 = new JSM.Vector (1.0, 0.0, 0.0);
	
	var radius1 = 1.0;
	var radius2 = 2.0;
	
	var circ1 = 2.0 * radius1 * Math.PI;
	var circ2 = 2.0 * radius2 * Math.PI;
	
	var normal1 = new JSM.Vector (0.0, 0.0, 1.0);
	var normal2 = new JSM.Vector (0.0, 0.0, -1.0);
	
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a1, a1, radius1), 0.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a1, b1, radius1), circ1 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a2, b1, radius1), circ1 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a3, b1, radius1), circ1 / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a4, b1, radius1), circ1 / 8.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a5, b1, radius1), circ1 / 8.0));

	test.Assert (JSM.IsEqual (JSM.GetArcLength (a1, a1, radius2), 0.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a1, b1, radius2), circ2 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a2, b1, radius2), circ2 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a3, b1, radius2), circ2 / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a4, b1, radius2), circ2 / 8.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a5, b1, radius2), circ2 / 8.0));
	
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a1, b1, radius1, normal1), circ1 * 1.0 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a2, b1, radius1, normal1), circ1 * 3.0 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a3, b1, radius1, normal1), circ1 / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a4, b1, radius1, normal1), circ1 * 1.0 / 8.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a5, b1, radius1, normal1), circ1 * 7.0 / 8.0));

	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a1, b1, radius2, normal1), circ2 * 1.0 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a2, b1, radius2, normal1), circ2 * 3.0 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a3, b1, radius2, normal1), circ2 / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a4, b1, radius2, normal1), circ2 * 1.0 / 8.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a5, b1, radius2, normal1), circ2 * 7.0 / 8.0));

	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a1, b1, radius2, normal2), circ2 * 3.0 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a2, b1, radius2, normal2), circ2 * 1.0 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a3, b1, radius2, normal2), circ2 / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a4, b1, radius2, normal2), circ2 * 7.0 / 8.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a5, b1, radius2, normal2), circ2 * 1.0 / 8.0));

	var v1 = new JSM.Vector (1.0, 0.0, 0.0);
	var v2 = new JSM.Vector (1.0, 0.0, 0.0);
	var normal = new JSM.Vector (0.0, 0.0, 1.0);
	var origo = new JSM.Coord (0.0, 0.0, 0.0);
	test.Assert (JSM.IsEqual (JSM.GetVectorsFullAngle (v1, v2, normal), 0.0));
	for (var i = 0.0; i < Math.PI; i = i + 5.0 * JSM.DegRad) {
		test.Assert (JSM.IsEqual (JSM.GetVectorsFullAngle (v1.Clone ().Rotate (normal, i, origo), v2, normal), i));
	}
});

generalSuite.AddTest ('TransformationTest', function (test) {
	var transformation = new JSM.IdentityTransformation ();
	
	var coord = new JSM.Coord (1.0, 1.0, 1.0);
	var direction = new JSM.Vector (1.0, 0.0, 0.0);
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (1.0, 1.0, 1.0)));

	transformation = JSM.OffsetTransformation (direction, 1.0);
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (2.0, 1.0, 1.0)));

	transformation = JSM.TranslationTransformation (new JSM.Coord (1.0, 2.0, 3.0));
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (2.0, 3.0, 4.0)));

	transformation = JSM.TranslationTransformation (new JSM.Coord (1.0, 0.0, 0.0));
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (2.0, 1.0, 1.0)));
	transformation = JSM.TranslationTransformation (new JSM.Coord (-1.0, 0.0, 0.0));
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (0.0, 1.0, 1.0)));

	transformation = JSM.TranslationTransformation (new JSM.Coord (0.0, 1.0, 0.0));
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (1.0, 2.0, 1.0)));
	transformation = JSM.TranslationTransformation (new JSM.Coord (0.0, -1.0, 0.0));
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (1.0, 0.0, 1.0)));

	transformation = JSM.TranslationTransformation (new JSM.Coord (0.0, 0.0, 1.0));
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (1.0, 1.0, 2.0)));
	transformation = JSM.TranslationTransformation (new JSM.Coord (0.0, 0.0, -1.0));
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (1.0, 1.0, 0.0)));

	var axis = new JSM.Vector (0.0, 0.0, 1.0);
	var angle = 90.0 * JSM.DegRad;
	transformation = JSM.RotationTransformation (axis, angle);
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (-1.0, 1.0, 1.0)));
	transformation = JSM.RotationZTransformation (angle);
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (-1.0, 1.0, 1.0)));
	
	var trX = new JSM.RotationXTransformation (angle);
	var trY = new JSM.RotationYTransformation (angle);
	var trZ = new JSM.RotationZTransformation (angle);
	
	var axisX = new JSM.Vector (1.0, 0.0, 0.0);
	var axisY = new JSM.Vector (0.0, 1.0, 0.0);
	var axisZ = new JSM.Vector (0.0, 0.0, 1.0);
	
	var trRotX = new JSM.RotationTransformation (axisX, angle);
	var trRotY = new JSM.RotationTransformation (axisY, angle);
	var trRotZ = new JSM.RotationTransformation (axisZ, angle);

	test.Assert (trX.Apply (coord).IsEqual (trRotX.Apply (coord)));
	test.Assert (trY.Apply (coord).IsEqual (trRotY.Apply (coord)));
	test.Assert (trZ.Apply (coord).IsEqual (trRotZ.Apply (coord)));

	var origo = new JSM.Coord (0.0, 0.0, 0.0);
	trRotX = new JSM.RotationTransformation (axisX, angle, origo);
	trRotY = new JSM.RotationTransformation (axisY, angle, origo);
	trRotZ = new JSM.RotationTransformation (axisZ, angle, origo);

	test.Assert (trX.Apply (coord).IsEqual (trRotX.Apply (coord)));
	test.Assert (trY.Apply (coord).IsEqual (trRotY.Apply (coord)));
	test.Assert (trZ.Apply (coord).IsEqual (trRotZ.Apply (coord)));

	var origo = new JSM.Coord (1.0, 2.0, 3.0);
	var trXOrigo = new JSM.RotationXTransformation (angle, origo);
	var trYOrigo = new JSM.RotationYTransformation (angle, origo);
	var trZOrigo = new JSM.RotationZTransformation (angle, origo);

	var trRotXOrigo = new JSM.RotationTransformation (axisX, angle, origo);
	var trRotYOrigo = new JSM.RotationTransformation (axisY, angle, origo);
	var trRotZOrigo = new JSM.RotationTransformation (axisZ, angle, origo);

	test.Assert (trXOrigo.Apply (coord).IsEqual (trRotXOrigo.Apply (coord)));
	test.Assert (trYOrigo.Apply (coord).IsEqual (trRotYOrigo.Apply (coord)));
	test.Assert (trZOrigo.Apply (coord).IsEqual (trRotZOrigo.Apply (coord)));

	var coord = new JSM.Coord (2.0, 0.0, 0.0);
	transformation = new JSM.RotationZTransformation (90.0 * JSM.DegRad, new JSM.Coord (0.0, 0.0, 0.0));
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (0.0, 2.0, 0.0)));
	transformation = new JSM.RotationZTransformation (90.0 * JSM.DegRad, new JSM.Coord (1.0, 0.0, 0.0));
	test.Assert (transformation.Apply (coord).IsEqual (new JSM.Coord (1.0, 1.0, 0.0)));

	var coord = new JSM.Coord (1.0, 2.0, 3.0);
	var axis = new JSM.Vector (4.0, 5.0, 6.0);
	var angle = 7.0 * JSM.DegRad;
	var origo = new JSM.Coord (8.0, 9.0, 10.0);
	transformation = new JSM.RotationTransformation (axis, angle, origo);
	test.Assert (coord.Clone ().Rotate (axis, angle, origo).IsEqual (transformation.Apply (coord)));
	
	var coord = new JSM.Coord (1.0, 2.0, 3.0);
	var direction = new JSM.Coord (4.0, 5.0, 6.0);
	var axis = new JSM.Vector (4.0, 5.0, 6.0);
	var angle = 7.0 * JSM.DegRad;
	var origo = new JSM.Coord (0.0, 0.0, 0.0);
	var result1 = coord.Clone ();
	result1.Offset (direction, 11.0);
	result1.Rotate (axis, angle, origo);
	
	var offsetTransformation = new JSM.OffsetTransformation (direction, 11.0);
	var rotateTransformation = new JSM.RotationTransformation (axis, angle, origo);
	
	var transformation = new JSM.Transformation ();
	transformation.Append (offsetTransformation);
	transformation.Append (rotateTransformation);
	
	var result2 = transformation.Apply (coord);
	test.Assert (result1.IsEqual (result2));

	var trX = new JSM.RotationXTransformation (10 * JSM.DegRad);
	var trY = new JSM.RotationYTransformation (20 * JSM.DegRad);
	var trZ = new JSM.RotationZTransformation (30 * JSM.DegRad);
	var trXYZ = new JSM.RotationXYZTransformation (10 * JSM.DegRad, 20 * JSM.DegRad, 30 * JSM.DegRad);
	
	var coord = new JSM.Coord (1.0, 2.0, 3.0);
	coord = trX.Apply (coord);
	coord = trY.Apply (coord);
	coord = trZ.Apply (coord);
	
	test.Assert (trXYZ.Apply (new JSM.Coord (1.0, 2.0, 3.0)).IsEqual (coord));
});

generalSuite.AddTest ('SectorTest', function (test) {
	var beg = new JSM.Coord2D (1.0, 2.0);
	var end = new JSM.Coord2D (3.0, 4.0);
	
	var sector = new JSM.Sector2D (beg, end);
	test.Assert (sector.beg.IsEqual (new JSM.Coord2D (1.0, 2.0)));
	test.Assert (sector.end.IsEqual (new JSM.Coord2D (3.0, 4.0)));
	
	sector.Set (end, beg);
	test.Assert (sector.beg.IsEqual (new JSM.Coord2D (3.0, 4.0)));
	test.Assert (sector.end.IsEqual (new JSM.Coord2D (1.0, 2.0)));

	var beg = new JSM.Coord (1.0, 2.0, 3.0);
	var end = new JSM.Coord (4.0, 5.0, 6.0);
	
	var sector = new JSM.Sector (beg, end);
	test.Assert (sector.beg.IsEqual (new JSM.Coord (1.0, 2.0, 3.0)));
	test.Assert (sector.end.IsEqual (new JSM.Coord (4.0, 5.0, 6.0)));
	
	sector.Set (end, beg);
	test.Assert (sector.beg.IsEqual (new JSM.Coord (4.0, 5.0, 6.0)));
	test.Assert (sector.end.IsEqual (new JSM.Coord (1.0, 2.0, 3.0)));
});

generalSuite.AddTest ('CoordLinePositionTest', function (test)
{
	var start2D = new JSM.Coord2D (1.0, 1.0);
	var direction2D = new JSM.Coord2D (1.0, 0.0);
	var line2D = new JSM.Line2D (start2D, direction2D);
	test.Assert (line2D.CoordPosition (new JSM.Coord2D (0.0, 0.0)) == JSM.CoordLinePosition2D.CoordAtLineRight);
	test.Assert (line2D.CoordPosition (new JSM.Coord2D (0.0, 2.0)) == JSM.CoordLinePosition2D.CoordAtLineLeft);
	test.Assert (line2D.CoordPosition (new JSM.Coord2D (0.0, 1.0)) == JSM.CoordLinePosition2D.CoordOnLine);

	var start = new JSM.Coord (1.0, 1.0, 1.0);
	var direction = new JSM.Coord (1.0, 0.0, 0.0);
	var line = new JSM.Line (start, direction);

	var projected = new JSM.Coord (0.0, 0.0, 0.0);
	test.Assert (line.CoordPosition (new JSM.Coord (0.0, 0.0, 0.0), projected) == JSM.CoordLinePosition.CoordOutsideOfLine);
	test.Assert (projected.IsEqual (new JSM.Coord (0.0, 1.0, 1.0)));
	test.Assert (line.CoordPosition (new JSM.Coord (1.0, 1.0, 1.0), projected) == JSM.CoordLinePosition.CoordOnLine);
	test.Assert (projected.IsEqual (new JSM.Coord (1.0, 1.0, 1.0)));
	test.Assert (line.CoordPosition (new JSM.Coord (2.0, 1.0, 1.0), projected) == JSM.CoordLinePosition.CoordOnLine);
	test.Assert (projected.IsEqual (new JSM.Coord (2.0, 1.0, 1.0)));

	test.Assert (line.ProjectCoord (new JSM.Coord (0.0, 0.0, 0.0)).IsEqual (new JSM.Coord (0.0, 1.0, 1.0)));
	test.Assert (line.ProjectCoord (new JSM.Coord (1.0, 1.0, 1.0)).IsEqual (new JSM.Coord (1.0, 1.0, 1.0)));
	test.Assert (line.ProjectCoord (new JSM.Coord (2.0, 1.0, 1.0)).IsEqual (new JSM.Coord (2.0, 1.0, 1.0)));
	
	var line1 = new JSM.Line (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0));
	var line2 = new JSM.Line (new JSM.Coord (0.0, 1.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0));
	var line3 = new JSM.Line (new JSM.Coord (0.0, 0.5, 0.0), new JSM.Coord (0.0, 1.0, 0.0));
	var line4 = new JSM.Line (new JSM.Coord (2.0, 3.0, 0.0), new JSM.Coord (0.0, 1.0, 0.0));
	var line5 = new JSM.Line (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 1.0, 0.0));
	var line6 = new JSM.Line (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (0.0, 0.0, 1.0));
	var line7 = new JSM.Line (new JSM.Coord (0.0, 0.0, 1.0), new JSM.Coord (1.0, 0.0, 0.0));
	var line8 = new JSM.Line (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 1.0, 1.0));
	var line9 = new JSM.Line (new JSM.Coord (1.0, 0.0, 0.0), new JSM.Coord (-1.0, 1.0, 1.0));
	
	var intersection = new JSM.Coord (0.0, 0.0, 0.0);
	test.Assert (line1.LinePosition (line1, intersection) == JSM.LineLinePosition.LinesIntersectsCoincident);
	test.Assert (line1.LinePosition (line2, intersection) == JSM.LineLinePosition.LinesIntersectsCoincident);
	test.Assert (line1.LinePosition (line7, intersection) == JSM.LineLinePosition.LinesIntersectsCoincident);
	test.Assert (line2.LinePosition (line7, intersection) == JSM.LineLinePosition.LinesIntersectsCoincident);
	test.Assert (line3.LinePosition (line7, intersection) == JSM.LineLinePosition.LinesDontIntersect);
	test.Assert (line4.LinePosition (line7, intersection) == JSM.LineLinePosition.LinesDontIntersect);
	test.Assert (line5.LinePosition (line7, intersection) == JSM.LineLinePosition.LinesDontIntersect);
	test.Assert (line6.LinePosition (line7, intersection) == JSM.LineLinePosition.LinesIntersectsOnePoint);
	test.Assert (intersection.IsEqual (new JSM.Coord (0.0, 0.0, 1.0)));
	test.Assert (line1.LinePosition (line3, intersection) == JSM.LineLinePosition.LinesIntersectsOnePoint);
	test.Assert (intersection.IsEqual (new JSM.Coord (0.0, 0.0, 0.0)));
	test.Assert (line1.LinePosition (line4, intersection) == JSM.LineLinePosition.LinesIntersectsOnePoint);
	test.Assert (intersection.IsEqual (new JSM.Coord (2.0, 0.0, 0.0)));
	test.Assert (line1.LinePosition (line5, intersection) == JSM.LineLinePosition.LinesIntersectsOnePoint);
	test.Assert (intersection.IsEqual (new JSM.Coord (0.0, 0.0, 0.0)));
	test.Assert (line2.LinePosition (line3, intersection) == JSM.LineLinePosition.LinesIntersectsOnePoint);
	test.Assert (intersection.IsEqual (new JSM.Coord (0.0, 1.0, 0.0)));
	test.Assert (line2.LinePosition (line4, intersection) == JSM.LineLinePosition.LinesIntersectsOnePoint);
	test.Assert (intersection.IsEqual (new JSM.Coord (2.0, 1.0, 0.0)));
	test.Assert (line2.LinePosition (line5, intersection) == JSM.LineLinePosition.LinesIntersectsOnePoint);
	test.Assert (intersection.IsEqual (new JSM.Coord (1.0, 1.0, 0.0)));
	test.Assert (line5.LinePosition (line6, intersection) == JSM.LineLinePosition.LinesIntersectsOnePoint);
	test.Assert (intersection.IsEqual (new JSM.Coord (0.0, 0.0, 0.0)));
	test.Assert (line6.LinePosition (line7, intersection) == JSM.LineLinePosition.LinesIntersectsOnePoint);
	test.Assert (intersection.IsEqual (new JSM.Coord (0.0, 0.0, 1.0)));
	test.Assert (line8.LinePosition (line9, intersection) == JSM.LineLinePosition.LinesIntersectsOnePoint);
	test.Assert (intersection.IsEqual (new JSM.Coord (0.5, 0.5, 0.5)));
});

generalSuite.AddTest ('CoordSectorPositionTest', function (test)
{
	var sector1 = new JSM.Sector (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0));
	var sector2 = new JSM.Sector (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (0.0, 0.0, 0.0));
	var sector3 = new JSM.Sector (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 1.0, 1.0));
	var sector4 = new JSM.Sector (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (42.0, 0.0, 0.0));
	
	test.Assert (sector1.CoordPosition (new JSM.Coord (0.0, 0.0, 1.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector1.CoordPosition (new JSM.Coord (0.0, 0.0, -1.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector1.CoordPosition (new JSM.Coord (0.25, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordInsideOfSector);
	test.Assert (sector1.CoordPosition (new JSM.Coord (0.5, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordInsideOfSector);
	test.Assert (sector1.CoordPosition (new JSM.Coord (0.75, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordInsideOfSector);
	test.Assert (sector1.CoordPosition (new JSM.Coord (0.0, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOnSectorEndCoord);
	test.Assert (sector1.CoordPosition (new JSM.Coord (1.0, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOnSectorEndCoord);
	test.Assert (sector1.CoordPosition (new JSM.Coord (-0.1, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector1.CoordPosition (new JSM.Coord (1.1, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);

	test.Assert (sector2.CoordPosition (new JSM.Coord (1.0, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector2.CoordPosition (new JSM.Coord (0.0, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOnSectorEndCoord);

	test.Assert (sector3.CoordPosition (new JSM.Coord (0.0, 0.0, 1.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord (0.0, 0.0, -1.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord (0.25, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord (0.5, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord (0.75, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord (0.0, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOnSectorEndCoord);
	test.Assert (sector3.CoordPosition (new JSM.Coord (1.0, 1.0, 1.0)) == JSM.CoordSectorPosition.CoordOnSectorEndCoord);
	test.Assert (sector3.CoordPosition (new JSM.Coord (1.0, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord (-0.1, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord (1.1, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord (0.5, 0.5, 0.5)) == JSM.CoordSectorPosition.CoordInsideOfSector);

	test.Assert (sector4.CoordPosition (new JSM.Coord (0.0, 0.0, 1.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector4.CoordPosition (new JSM.Coord (0.0, 0.0, -1.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector4.CoordPosition (new JSM.Coord (0.25, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordInsideOfSector);
	test.Assert (sector4.CoordPosition (new JSM.Coord (0.5, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordInsideOfSector);
	test.Assert (sector4.CoordPosition (new JSM.Coord (0.75, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordInsideOfSector);
	test.Assert (sector4.CoordPosition (new JSM.Coord (0.0, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOnSectorEndCoord);
	test.Assert (sector4.CoordPosition (new JSM.Coord (1.0, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordInsideOfSector);
	test.Assert (sector4.CoordPosition (new JSM.Coord (-0.1, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);
	test.Assert (sector4.CoordPosition (new JSM.Coord (1.1, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordInsideOfSector);	
	test.Assert (sector4.CoordPosition (new JSM.Coord (42, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOnSectorEndCoord);	
	test.Assert (sector4.CoordPosition (new JSM.Coord (42.1, 0.0, 0.0)) == JSM.CoordSectorPosition.CoordOutsideOfSector);	
});

generalSuite.AddTest ('CoordSectorPosition2DTest', function (test)
{
	var coord = new JSM.Coord2D (1.0, 0.0);
	var sector = new JSM.Sector2D (new JSM.Coord2D (0.0, 1.0), new JSM.Coord2D (1.0, 1.0));
	test.Assert (sector.CoordPosition (coord) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);

	var sector1 = new JSM.Sector2D (new JSM.Coord2D (1.0, 2.0), new JSM.Coord2D (1.0, 2.0));
	var sector2 = new JSM.Sector2D (new JSM.Coord2D (1.0, 2.0), new JSM.Coord2D (4.0, 3.0));
	var sector3 = new JSM.Sector2D (new JSM.Coord2D (1.0, 1.0), new JSM.Coord2D (3.0, 1.0));
	var sector4 = new JSM.Sector2D (new JSM.Coord2D (0.0, 1.0), new JSM.Coord2D (1.0, 1.0));

	test.Assert (sector1.CoordPosition (new JSM.Coord2D (0.0, 0.0)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector1.CoordPosition (new JSM.Coord2D (1.0, 2.0)) == JSM.CoordSectorPosition2D.CoordOnSectorEndCoord);
	test.Assert (sector1.CoordPosition (new JSM.Coord2D (1.0, 2.001)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);

	test.Assert (sector2.CoordPosition (new JSM.Coord2D (0.0, 0.0)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector2.CoordPosition (new JSM.Coord2D (7.0, 5.0)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector2.CoordPosition (new JSM.Coord2D (-2.0, 2.0)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector2.CoordPosition (new JSM.Coord2D (2.0, 2.0)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector2.CoordPosition (new JSM.Coord2D (3.0, 2.5)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector2.CoordPosition (new JSM.Coord2D (2.0, 3.0)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector2.CoordPosition (new JSM.Coord2D (3.0, 3.0)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector2.CoordPosition (new JSM.Coord2D (1.0, 2.0)) == JSM.CoordSectorPosition2D.CoordOnSectorEndCoord);
	test.Assert (sector2.CoordPosition (new JSM.Coord2D (4.0, 3.0)) == JSM.CoordSectorPosition2D.CoordOnSectorEndCoord);
	test.Assert (sector2.CoordPosition (new JSM.Coord2D (2.5, 2.5)) == JSM.CoordSectorPosition2D.CoordInsideOfSector);
	test.Assert (sector2.CoordPosition (new JSM.Coord2D (1.75, 2.25)) == JSM.CoordSectorPosition2D.CoordInsideOfSector);
	test.Assert (sector2.CoordPosition (new JSM.Coord2D (2.5, 2.501)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector2.CoordPosition (new JSM.Coord2D (1.75, 2.26)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);

	test.Assert (sector3.CoordPosition (new JSM.Coord2D (4.0, 1.0)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord2D (3.001, 1.0)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord2D (0.0, 1.0)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord2D (0.999, 1.0)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord2D (1.0, 1.0)) == JSM.CoordSectorPosition2D.CoordOnSectorEndCoord);
	test.Assert (sector3.CoordPosition (new JSM.Coord2D (3.0, 1.0)) == JSM.CoordSectorPosition2D.CoordOnSectorEndCoord);
	test.Assert (sector3.CoordPosition (new JSM.Coord2D (1.1, 1.0)) == JSM.CoordSectorPosition2D.CoordInsideOfSector);
	test.Assert (sector3.CoordPosition (new JSM.Coord2D (1.123456789, 1.0)) == JSM.CoordSectorPosition2D.CoordInsideOfSector);

	test.Assert (sector4.CoordPosition (new JSM.Coord2D (0.0, 0.0)) == JSM.CoordSectorPosition2D.CoordOutsideOfSector);
});

generalSuite.AddTest ('ProjectCoordToSector2DTest', function (test)
{
	var sector1 = new JSM.Sector2D (new JSM.Coord2D (1.0, 2.0), new JSM.Coord2D (1.0, 2.0));
	var sector2 = new JSM.Sector2D (new JSM.Coord2D (1.0, 2.0), new JSM.Coord2D (4.0, 3.0));
	var sector3 = new JSM.Sector2D (new JSM.Coord2D (1.0, 1.0), new JSM.Coord2D (3.0, 1.0));
	var sector4 = new JSM.Sector2D (new JSM.Coord2D (0.0, 1.0), new JSM.Coord2D (1.0, 1.0));

	test.Assert (sector1.ProjectCoord (new JSM.Coord2D (0.0, 0.0)).IsEqual (new JSM.Coord2D (1.0, 2.0)));
	test.Assert (sector1.ProjectCoord (new JSM.Coord2D (1.0, 2.0)).IsEqual (new JSM.Coord2D (1.0, 2.0)));
	test.Assert (sector1.ProjectCoord (new JSM.Coord2D (1.0, 2.001)).IsEqual (new JSM.Coord2D (1.0, 2.0)));

	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (0.0, 0.0)).IsEqual (new JSM.Coord2D (1.0, 2.0)));
	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (7.0, 5.0)).IsEqual (new JSM.Coord2D (4.0, 3.0)));
	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (-2.0, 2.0)).IsEqual (new JSM.Coord2D (1, 2)));
	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (2.0, 2.0)).IsEqual (new JSM.Coord2D (1.9, 2.3)));
	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (3.0, 2.5)).IsEqual (new JSM.Coord2D (2.95, 2.65)));
	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (2.0, 3.0)).IsEqual (new JSM.Coord2D (2.2, 2.4)));
	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (3.0, 3.0)).IsEqual (new JSM.Coord2D (3.1, 2.7)));
	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (1.0, 2.0)).IsEqual (new JSM.Coord2D (1.0, 2.0)));
	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (4.0, 3.0)).IsEqual (new JSM.Coord2D (4.0, 3.0)));
	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (2.5, 2.5)).IsEqual (new JSM.Coord2D (2.5, 2.5)));
	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (1.75, 2.25)).IsEqual (new JSM.Coord2D (1.75, 2.25)));
	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (2.5, 2.501)).IsEqual (new JSM.Coord2D (2.5003, 2.5001)));
	test.Assert (sector2.ProjectCoord (new JSM.Coord2D (1.75, 2.26)).IsEqual (new JSM.Coord2D (1.753, 2.251)));

	test.Assert (sector3.ProjectCoord (new JSM.Coord2D (4.0, 1.0)).IsEqual (new JSM.Coord2D (3.0, 1.0)));
	test.Assert (sector3.ProjectCoord (new JSM.Coord2D (3.001, 1.0)).IsEqual (new JSM.Coord2D (3.0, 1.0)));
	test.Assert (sector3.ProjectCoord (new JSM.Coord2D (0.0, 1.0)).IsEqual (new JSM.Coord2D (1.0, 1.0)));
	test.Assert (sector3.ProjectCoord (new JSM.Coord2D (0.999, 1.0)).IsEqual (new JSM.Coord2D (1.0, 1.0)));
	test.Assert (sector3.ProjectCoord (new JSM.Coord2D (1.0, 1.0)).IsEqual (new JSM.Coord2D (1.0, 1.0)));
	test.Assert (sector3.ProjectCoord (new JSM.Coord2D (3.0, 1.0)).IsEqual (new JSM.Coord2D (3.0, 1.0)));
	test.Assert (sector3.ProjectCoord (new JSM.Coord2D (1.1, 1.0)).IsEqual (new JSM.Coord2D (1.1, 1.0)));
	test.Assert (sector3.ProjectCoord (new JSM.Coord2D (2.0, 0.0)).IsEqual (new JSM.Coord2D (2.0, 1.0)));
	test.Assert (sector3.ProjectCoord (new JSM.Coord2D (1.123456789, 1.0)).IsEqual (new JSM.Coord2D (1.123456789, 1.0)));

	test.Assert (sector4.ProjectCoord (new JSM.Coord2D (0.0, 0.0)).IsEqual (new JSM.Coord2D (0.0, 1.0)));
});

generalSuite.AddTest ('SectorSectorPositionTest', function (test)
{
	var GetSector2D = function (a, b, c, d)
	{
		return new JSM.Sector2D (new JSM.Coord2D (a, b), new JSM.Coord2D (c, d));
	}

	var sector1 = new JSM.Sector2D (new JSM.Coord2D (0.0, 1.0), new JSM.Coord2D (1.0, 1.0));
	var sector2 = new JSM.Sector2D (new JSM.Coord2D (0.0, 2.0), new JSM.Coord2D (1.0, 2.0));
	test.Assert (sector1.SectorPosition (sector2) == JSM.SectorSectorPosition2D.SectorsDontIntersect);

	var sector1 = new JSM.Sector2D (new JSM.Coord2D (1.0, 2.0), new JSM.Coord2D (1.0, 2.0));
	var sector2 = new JSM.Sector2D (new JSM.Coord2D (1.0, 2.0), new JSM.Coord2D (4.0, 3.0));
	var sector3 = new JSM.Sector2D (new JSM.Coord2D (1.0, 1.0), new JSM.Coord2D (3.0, 1.0));
	var sector4 = new JSM.Sector2D (new JSM.Coord2D (0.0, 1.0), new JSM.Coord2D (1.0, 1.0));

	var intersection = new JSM.Coord2D (0.0, 0.0);
	test.Assert (sector3.SectorPosition (GetSector2D (0.0, 0.0, 0.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (sector3.SectorPosition (GetSector2D (0.0, 0.0, 1.0, 0.0)) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (sector3.SectorPosition (GetSector2D (0.0, 0.0, 1.0, 1.0), intersection) == JSM.SectorSectorPosition2D.SectorsIntersectEndPoint);
	test.Assert (intersection.IsEqual (new JSM.Coord2D (1.0, 1.0)));
	test.Assert (sector3.SectorPosition (GetSector2D (0.0, 0.0, 3.0, 1.0), intersection) == JSM.SectorSectorPosition2D.SectorsIntersectEndPoint);
	test.Assert (intersection.IsEqual (new JSM.Coord2D (3.0, 1.0)));
	test.Assert (sector3.SectorPosition (GetSector2D (1.0, 1.0, 3.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsIntersectCoincident);
	test.Assert (sector3.SectorPosition (GetSector2D (3.0, 1.0, 1.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsIntersectCoincident);

	test.Assert (sector3.SectorPosition (GetSector2D (1.0, 0.0, 1.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsIntersectEndPoint);
	test.Assert (sector3.SectorPosition (GetSector2D (1.0, 0.0, 1.0, 2.0)) == JSM.SectorSectorPosition2D.SectorsIntersectEndPoint);
	test.Assert (sector3.SectorPosition (GetSector2D (3.0, 0.0, 3.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsIntersectEndPoint);
	test.Assert (sector3.SectorPosition (GetSector2D (3.0, 0.0, 3.0, 2.0)) == JSM.SectorSectorPosition2D.SectorsIntersectEndPoint);
	test.Assert (sector3.SectorPosition (GetSector2D (2.0, 0.0, 4.0, 2.0)) == JSM.SectorSectorPosition2D.SectorsIntersectEndPoint);

	test.Assert (sector3.SectorPosition (GetSector2D (-1.0, 1.0, 0.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (sector3.SectorPosition (GetSector2D (4.0, 1.0, 5.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (sector3.SectorPosition (GetSector2D (0.0, 0.0, 2.0, 0.0)) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (sector3.SectorPosition (GetSector2D (1.0, 0.0, 3.0, 0.0)) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (sector3.SectorPosition (GetSector2D (1.0, 2.0, 3.0, 2.0)) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (sector3.SectorPosition (GetSector2D (0.0, 1.0, 1.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsIntersectEndPoint);
	test.Assert (sector3.SectorPosition (GetSector2D (3.0, 1.0, 4.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsIntersectEndPoint);
	test.Assert (sector3.SectorPosition (GetSector2D (0.0, 1.0, 2.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsIntersectCoincident);
	test.Assert (sector3.SectorPosition (GetSector2D (2.0, 1.0, 2.5, 1.0)) == JSM.SectorSectorPosition2D.SectorsIntersectCoincident);
	test.Assert (sector3.SectorPosition (GetSector2D (2.0, 1.0, 3.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsIntersectCoincident);
	test.Assert (sector3.SectorPosition (GetSector2D (2.0, 1.0, 4.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsIntersectCoincident);
                 
	test.Assert (sector3.SectorPosition (GetSector2D (4.0, 1.0, 5.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (sector3.SectorPosition (GetSector2D (-1.0, 1.0, -3.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
                 
	test.Assert (GetSector2D (-1.0, 1.0, 0.0, 1.0).SectorPosition (sector3) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (GetSector2D (4.0, 1.0, 5.0, 1.0).SectorPosition (sector3) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (GetSector2D (0.0, 0.0, 2.0, 0.0).SectorPosition (sector3) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (GetSector2D (1.0, 0.0, 3.0, 0.0).SectorPosition (sector3) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (GetSector2D (1.0, 2.0, 3.0, 2.0).SectorPosition (sector3) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (GetSector2D (0.0, 1.0, 1.0, 1.0).SectorPosition (sector3) == JSM.SectorSectorPosition2D.SectorsIntersectEndPoint);
	test.Assert (GetSector2D (3.0, 1.0, 4.0, 1.0).SectorPosition (sector3) == JSM.SectorSectorPosition2D.SectorsIntersectEndPoint);
	test.Assert (GetSector2D (0.0, 1.0, 2.0, 1.0).SectorPosition (sector3) == JSM.SectorSectorPosition2D.SectorsIntersectCoincident);
	test.Assert (GetSector2D (2.0, 1.0, 2.5, 1.0).SectorPosition (sector3) == JSM.SectorSectorPosition2D.SectorsIntersectCoincident);
	test.Assert (GetSector2D (2.0, 1.0, 3.0, 1.0).SectorPosition (sector3) == JSM.SectorSectorPosition2D.SectorsIntersectCoincident);
	test.Assert (GetSector2D (2.0, 1.0, 4.0, 1.0).SectorPosition (sector3) == JSM.SectorSectorPosition2D.SectorsIntersectCoincident);
	             
	test.Assert (GetSector2D (0.0, 0.0, 1.0, 1.0).SectorPosition (GetSector2D (3.0, 0.0, 3.0, 3.0)) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
	test.Assert (GetSector2D (3.0, 0.0, 3.0, 3.0).SectorPosition (GetSector2D (0.0, 0.0, 1.0, 1.0)) == JSM.SectorSectorPosition2D.SectorsDontIntersect);
});

generalSuite.AddTest ('BoxTest', function (test)
{
	var box = new JSM.Box2D (new JSM.Coord2D (0.0, 0.0), new JSM.Coord2D (1.0, 1.0));
	test.Assert (box.GetCenter ().IsEqual (new JSM.Coord2D (0.5, 0.5)));

	var box = new JSM.Box (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 1.0, 1.0));
	test.Assert (box.GetCenter ().IsEqual (new JSM.Coord (0.5, 0.5, 0.5)));

	var box2 = new JSM.Box (new JSM.Coord (-0.5, -0.5, -0.5), new JSM.Coord (0.5, 0.5, 0.5));
	var box3 = JSM.BoxUnion (box, box2);
	test.Assert (box3.min.IsEqual (new JSM.Coord (-0.5, -0.5, -0.5)));
	test.Assert (box3.max.IsEqual (new JSM.Coord (1.0, 1.0, 1.0)));
});

generalSuite.AddTest ('SphereTest', function (test)
{
	var sphere = new JSM.Sphere (new JSM.Coord (1.0, 1.0, 1.0), 2.0);
	var sphere2 = sphere.Clone ();
	test.Assert (sphere2.GetCenter ().IsEqual (new JSM.Coord (1.0, 1.0, 1.0)));
	test.Assert (sphere2.GetRadius () == 2.0);

	sphere.Set (new JSM.Coord (3.0, 3.0, 3.0), 4.0);
	test.Assert (sphere.GetCenter ().IsEqual (new JSM.Coord (3.0, 3.0, 3.0)));
	test.Assert (sphere.GetRadius () == 4.0);
});

generalSuite.AddTest ('PlaneTest', function (test)
{
	var plane = new JSM.Plane (1.0, 2.0, 3.0, 4.0);
	test.Assert (plane.a == 1.0 && plane.b == 2.0 && plane.c == 3.0 && plane.d == 4.0);
	plane.Set (5.0, 6.0, 7.0, 8.0);
	test.Assert (plane.a == 5.0 && plane.b == 6.0 && plane.c == 7.0 && plane.d == 8.0);
	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (0.0, 0.0, 1.0));
	test.Assert (plane.a == 0.0 && plane.b == 0.0 && plane.c == 1.0 && plane.d == 0.0);
	plane = JSM.GetPlaneFromThreeCoords (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0), new JSM.Vector (0.0, 1.0, 0.0));
	test.Assert (plane.a == 0.0 && plane.b == 0.0 && plane.c == 1.0 && plane.d == 0.0);

	var coord1 = new JSM.Coord (0.0, 0.0, 0.0);
	var coord1b = new JSM.Coord (0.0, 0.0, 2.0);
	var coord2 = new JSM.Coord (1.0, 0.0, 0.0);
	var coord3 = new JSM.Coord (1.0, 1.0, 1.0);

	var plane1a = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (0.0, 0.0, 1.0));
	var plane2a = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	var plane3a = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (1.0, 1.0, 1.0), new JSM.Vector (0.0, 0.0, 1.0));
	
	var plane1b = JSM.GetPlaneFromThreeCoords (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0), new JSM.Coord (0.0, 1.0, 0.0));
	var plane2b = JSM.GetPlaneFromThreeCoords (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (0.0, 1.0, 0.0), new JSM.Coord (0.0, 0.0, 1.0));
	var plane3b = JSM.GetPlaneFromThreeCoords (new JSM.Coord (1.0, 1.0, 1.0), new JSM.Coord (2.0, 1.0, 1.0), new JSM.Coord (1.0, 2.0, 1.0));
	
	var plane1, plane2, plane3;
	var i;
	for (i = 0; i < 2; i++) {
		if (i == 0) {
			plane1 = plane1a;
			plane2 = plane2a;
			plane3 = plane3a;
		} else if (i == 1) {
			plane1 = plane1b;
			plane2 = plane2b;
			plane3 = plane3b;
		}
	
		test.Assert (plane1.CoordPosition (coord1) == JSM.CoordPlanePosition.CoordOnPlane);
		test.Assert (plane2.CoordPosition (coord1) == JSM.CoordPlanePosition.CoordOnPlane);
		test.Assert (plane3.CoordPosition (coord1b) == JSM.CoordPlanePosition.CoordInFrontOfPlane);
		test.Assert (plane3.CoordPosition (coord1) == JSM.CoordPlanePosition.CoordAtBackOfPlane);

		test.Assert (JSM.IsEqual (JSM.CoordPlaneSignedDirectionalDistance (coord1, new JSM.Coord (1.0, 0.0, 0.0), plane1), 0.0));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneSignedDirectionalDistance (coord1, new JSM.Coord (1.0, 0.0, 0.0), plane2), 0.0));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneSignedDirectionalDistance (coord1, new JSM.Coord (0.0, 0.0, 1.0), plane3), -1.0));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneSignedDirectionalDistance (coord1, new JSM.Coord (0.0, 1.0, 1.0), plane3), -1.4142135623));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneSignedDirectionalDistance (coord1b, new JSM.Coord (0.0, 1.0, 1.0), plane3), 1.4142135623));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneDirectionalDistance (coord1, new JSM.Coord (0.0, 1.0, 1.0), plane3), 1.4142135623));
		
		test.Assert (JSM.IsEqual (plane1.CoordDistance (coord1), 0.0));
		test.Assert (JSM.IsEqual (plane2.CoordDistance (coord1), 0.0));
		test.Assert (JSM.IsEqual (plane3.CoordDistance (coord1), 1.0));

		test.Assert (JSM.IsEqual (plane1.CoordDistance (coord2), 0.0));
		test.Assert (JSM.IsEqual (plane2.CoordDistance (coord2), 1.0));
		test.Assert (JSM.IsEqual (plane3.CoordDistance (coord2), 1.0));

		test.Assert (JSM.IsEqual (plane1.CoordDistance (coord3), 1.0));
		test.Assert (JSM.IsEqual (plane2.CoordDistance (coord3), 1.0));
		test.Assert (JSM.IsEqual (plane3.CoordDistance (coord3), 0.0));
		
		test.Assert (plane1.ProjectCoord (coord1).IsEqual (new JSM.Coord (0.0, 0.0, 0.0)));
		test.Assert (plane2.ProjectCoord (coord1).IsEqual (new JSM.Coord (0.0, 0.0, 0.0)));
		test.Assert (plane3.ProjectCoord (coord1).IsEqual (new JSM.Coord (0.0, 0.0, 1.0)));

		test.Assert (plane1.ProjectCoord (coord2).IsEqual (new JSM.Coord (1.0, 0.0, 0.0)));
		test.Assert (plane2.ProjectCoord (coord2).IsEqual (new JSM.Coord (0.0, 0.0, 0.0)));
		test.Assert (plane3.ProjectCoord (coord2).IsEqual (new JSM.Coord (1.0, 0.0, 1.0)));

		test.Assert (plane1.ProjectCoord (coord3).IsEqual (new JSM.Coord (1.0, 1.0, 0.0)));
		test.Assert (plane2.ProjectCoord (coord3).IsEqual (new JSM.Coord (0.0, 1.0, 1.0)));
		test.Assert (plane3.ProjectCoord (coord3).IsEqual (new JSM.Coord (1.0, 1.0, 1.0)));
		
		var line1 = new JSM.Line (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
		var line2 = new JSM.Line (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (0.0, 0.0, 1.0));
		var line3 = new JSM.Line (new JSM.Coord (1.0, 2.0, 3.0), new JSM.Vector (0.0, 0.0, 1.0));
		test.Assert (plane1.LinePosition (line1) == JSM.LinePlanePosition.LineParallelToPlane);
		test.Assert (plane1.LinePosition (line2) == JSM.LinePlanePosition.LineIntersectsPlane);
		
		var intersection = new JSM.Coord (0.0, 0.0, 0.0);
		test.Assert (plane1.LinePosition (line3, intersection) == JSM.LinePlanePosition.LineIntersectsPlane);
		test.Assert (intersection.IsEqual (new JSM.Coord (1.0, 2.0, 0.0)));
		test.Assert (plane1.LineIntersection (line3).IsEqual (new JSM.Coord (1.0, 2.0, 0.0)));
	}
});

generalSuite.AddTest ('ProjectionTest', function (test)
{
	var eye = new JSM.Coord (1, 0, 0);
	var center = new JSM.Coord (0, 0, 0);
	var up = new JSM.Coord (0, 0, 1);
	var width = 200;
	var height = 100;
	var fieldOfView = 45.0;
	var aspectRatio = width / height;
	var nearPlane = 0.1;
	var farPlane = 100;
	var viewPort = [0, 0, width, height];

	var projected = new JSM.Coord (0.0, 0.0, 0.0);

	projected = JSM.Project (new JSM.Coord (0, 0, 0), eye, center, up, fieldOfView * JSM.DegRad, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (projected != null);
	test.Assert (JSM.IsEqual (projected.x, 100) && JSM.IsEqual (projected.y, 50));

	projected = JSM.Project (new JSM.Coord (0.5, 0, 0), eye, center, up, fieldOfView * JSM.DegRad, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (projected != null);
	test.Assert (JSM.IsEqual (projected.x, 100) && JSM.IsEqual (projected.y, 50));

	projected = JSM.Project (new JSM.Coord (1.5, 0, 0), eye, center, up, fieldOfView * JSM.DegRad, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (projected != null);
	test.Assert (JSM.IsEqual (projected.x, 100) && JSM.IsEqual (projected.y, 50));

	projected = JSM.Project (new JSM.Coord (100, 0, 0), eye, center, up, fieldOfView * JSM.DegRad, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (projected != null);
	test.Assert (JSM.IsEqual (projected.x, 100) && JSM.IsEqual (projected.y, 50));

	projected = JSM.Project (new JSM.Coord (-100, 0, 0), eye, center, up, fieldOfView * JSM.DegRad, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (projected != null);
	test.Assert (JSM.IsEqual (projected.x, 100) && JSM.IsEqual (projected.y, 50));

	projected = JSM.Project (new JSM.Coord (1, 0, 0), eye, center, up, fieldOfView * JSM.DegRad, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (projected == null);

	projected = JSM.Project (new JSM.Coord (0, 0.5, 0), eye, center, up, fieldOfView * JSM.DegRad, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (projected != null);
	test.Assert (JSM.IsEqual (projected.x, 160.35533905932851) && JSM.IsEqual (projected.y, 50));

	projected = JSM.Project (new JSM.Coord (0, 0, 0.5), eye, center, up, fieldOfView * JSM.DegRad, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (projected != null);
	test.Assert (JSM.IsEqual (projected.x, 100) && JSM.IsEqual (projected.y, 110.3553390593285));

	projected = JSM.Project (new JSM.Coord (0, 0.5, 0.5), eye, center, up, fieldOfView * JSM.DegRad, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (projected != null);
	test.Assert (JSM.IsEqual (projected.x, 160.35533905932851) && JSM.IsEqual (projected.y, 110.3553390593285));
});

generalSuite.AddTest ('ConvexHullTest', function (test)
{
	var result = [];
	var coord = [];
	
	coords = [];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '');

	coords = [
		new JSM.Coord2D	(0, 0)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '');

	coords = [
		new JSM.Coord2D	(0, 0),
		new JSM.Coord2D	(1, 0)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '');

	coords = [
		new JSM.Coord2D	(0, 0),
		new JSM.Coord2D	(1, 0),
		new JSM.Coord2D	(1, 1)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '0,1,2');

	coords = [
		new JSM.Coord2D	(0, 0),
		new JSM.Coord2D	(1, 0),
		new JSM.Coord2D	(1, 1),
		new JSM.Coord2D	(0, 1)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '0,1,2,3');

	coords = [
		new JSM.Coord2D	(0, 0),
		new JSM.Coord2D	(1, 0),
		new JSM.Coord2D	(0.5, 0.5),
		new JSM.Coord2D	(1, 1),
		new JSM.Coord2D	(0, 1)
	];
	
	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '0,1,3,4');

	coords = [
		new JSM.Coord2D	(0, 0),
		new JSM.Coord2D	(1, 0),
		new JSM.Coord2D	(0.5, 0.1),
		new JSM.Coord2D	(0.6, 0.2),
		new JSM.Coord2D	(0.7, 0.3),
		new JSM.Coord2D	(0.8, 0.4),
		new JSM.Coord2D	(1, 1),
		new JSM.Coord2D	(0, 1)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '0,1,6,7');

	coords = [
		new JSM.Coord2D	(0.5, 0.1),
		new JSM.Coord2D	(0.6, 0.2),
		new JSM.Coord2D	(0.7, 0.3),
		new JSM.Coord2D	(0.8, 0.4),
		new JSM.Coord2D	(0, 0),
		new JSM.Coord2D	(1, 0),
		new JSM.Coord2D	(1, 1),
		new JSM.Coord2D	(0, 1)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '4,5,6,7');

	coords = [
		new JSM.Coord2D	(2, 4),
		new JSM.Coord2D	(3, 2),
		new JSM.Coord2D	(4, 1),
		new JSM.Coord2D	(5, 6),
		new JSM.Coord2D	(1, 5),
		new JSM.Coord2D	(0, 4),
		new JSM.Coord2D	(2, 0)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '5,6,2,3,4');

	coords = [
		new JSM.Coord2D	(2, 5),
		new JSM.Coord2D	(3, 3),
		new JSM.Coord2D	(1, 3),
		new JSM.Coord2D	(5, 6),
		new JSM.Coord2D	(0, 1),
		new JSM.Coord2D	(4, 2),
		new JSM.Coord2D	(6, 1),
		new JSM.Coord2D	(4, 4),
		new JSM.Coord2D	(6, 6),
		new JSM.Coord2D	(0, 6)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '4,6,8,3,9');

	coords = [];
	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '');

	coords.push (new JSM.Coord (0, 0, 0));
	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '');

	coords.push (new JSM.Coord (1, 0, 0));
	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '');

	coords.push (new JSM.Coord (1, 1, 0));
	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '');

	coords.push (new JSM.Coord (0, 1, 0));
	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '0,1,2,0,2,3,2,1,3,1,0,3');

	coords = [
		new JSM.Coord (0, 0, 0),
		new JSM.Coord (1, 0, 0),
		new JSM.Coord (1, 1, 0),
		new JSM.Coord (0, 1, 0),
		new JSM.Coord (0, 0, 1),
		new JSM.Coord (1, 0, 1),
		new JSM.Coord (1, 1, 1),
		new JSM.Coord (0, 1, 1)
	];

	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '2,1,3,1,0,3,0,1,5,4,0,5,1,2,6,5,1,6,3,0,7,0,4,7,2,3,7,6,2,7,4,5,7,5,6,7');
	
	var a = 1.0;
	var b = 0.0;
	var c = (1.0 + Math.sqrt (5.0)) / 2.0;
	var d = 1.0 / c;
	
	coords = [
		new JSM.Coord (+a, +a, +a),
		new JSM.Coord (+a, +a, -a),
		new JSM.Coord (+a, -a, +a),
		new JSM.Coord (-a, +a, +a),
		
		new JSM.Coord (+a, -a, -a),
		new JSM.Coord (-a, +a, -a),
		new JSM.Coord (-a, -a, +a),
		new JSM.Coord (-a, -a, -a),

		new JSM.Coord (+b, +d, +c),
		new JSM.Coord (+b, +d, -c),
		new JSM.Coord (+b, -d, +c),
		new JSM.Coord (+b, -d, -c),

		new JSM.Coord (+d, +c, +b),
		new JSM.Coord (+d, -c, +b),
		new JSM.Coord (-d, +c, +b),
		new JSM.Coord (-d, -c, +b),

		new JSM.Coord (+c, +b, +d),
		new JSM.Coord (-c, +b, +d),
		new JSM.Coord (+c, +b, -d),
		new JSM.Coord (-c, +b, -d)
	];
	
	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '3,8,14,8,0,14,0,12,14,1,9,14,12,1,14,9,5,14,2,10,15,13,2,15,10,6,15,7,11,15,11,4,15,4,13,15,10,2,16,0,8,16,8,10,16,6,10,17,8,3,17,10,8,17,4,11,18,9,1,18,11,9,18,1,12,18,12,0,18,0,16,18,2,13,18,16,2,18,13,4,18,11,7,19,5,9,19,9,11,19,3,14,19,17,3,19,14,5,19,7,15,19,15,6,19,6,17,19');

	coords.push (new JSM.Coord (0, 0, 0));
	coords.push (new JSM.Coord (0.1, 0, 0));
	coords.push (new JSM.Coord (0.1, 0.1, 0));
	coords.push (new JSM.Coord (0, 0.1, 0));
	coords.push (new JSM.Coord (0, 0, 0.1));
	coords.push (new JSM.Coord (0.1, 0, 0.1));
	coords.push (new JSM.Coord (0.1, 0.1, 0.1));
	coords.push (new JSM.Coord (0, 0.1, 0.1));

	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '3,8,14,8,0,14,0,12,14,1,9,14,12,1,14,9,5,14,2,10,15,13,2,15,10,6,15,7,11,15,11,4,15,4,13,15,10,2,16,0,8,16,8,10,16,6,10,17,8,3,17,10,8,17,4,11,18,9,1,18,11,9,18,1,12,18,12,0,18,0,16,18,2,13,18,16,2,18,13,4,18,11,7,19,5,9,19,9,11,19,3,14,19,17,3,19,14,5,19,7,15,19,15,6,19,6,17,19');
});

generalSuite.AddTest ('OctreeTest', function (test)
{
	var i;
	for (i = 0; i < 2; i++) {
		var maxNodeNum = (i === 0 ? null : 5);
		var octree = new JSM.Octree (new JSM.Box (new JSM.Coord (-1.0, -1.0, -1.0), new JSM.Coord (1.0, 1.0, 1.0)), maxNodeNum);
		var coords = [
			new JSM.Coord (0.0, 0.0, 0.0),
			new JSM.Coord (1.0, 1.0, 1.0),
			new JSM.Coord (-1.0, -1.0, -1.0),
			new JSM.Coord (0.1, 0.0, 0.0),
			new JSM.Coord (0.2, 0.0, 0.0),
			new JSM.Coord (0.3, 0.0, 0.0),
			new JSM.Coord (0.30001, 0.0, 0.0),
			new JSM.Coord (0.30000001, 0.0, 0.0),
			new JSM.Coord (0.30001001, 0.0, 0.0),
			new JSM.Coord (0.99, 0.99, 0.99),
			new JSM.Coord (-0.99, -0.99, -0.99),
			new JSM.Coord (0.99, -0.99, -0.99),
			new JSM.Coord (-0.99, 0.99, -0.99),
			new JSM.Coord (-0.98, 0.99, -0.99),
			new JSM.Coord (-0.97, 0.99, -0.99),
			new JSM.Coord (-0.96, 0.99, -0.99)		
		];
		
		test.Assert (octree.AddCoord (coords[0]) == 0);
		test.Assert (octree.AddCoord (coords[0]) == 0);
		test.Assert (octree.AddCoord (coords[0]) == 0);
		test.Assert (octree.AddCoord (coords[0]) == 0);
		test.Assert (octree.AddCoord (coords[0]) == 0);
		
		test.Assert (octree.AddCoord (coords[1]) == 1);
		test.Assert (octree.AddCoord (coords[2]) == 2);
		test.Assert (octree.AddCoord (coords[0]) == 0);

		test.Assert (octree.AddCoord (coords[3]) == 3);
		test.Assert (octree.AddCoord (coords[4]) == 4);
		test.Assert (octree.AddCoord (coords[5]) == 5);
		test.Assert (octree.AddCoord (coords[6]) == 6);
		test.Assert (octree.AddCoord (coords[7]) == 5);
		test.Assert (octree.AddCoord (coords[8]) == 6);
		
		test.Assert (octree.AddCoord (coords[9]) == 7);
		test.Assert (octree.AddCoord (coords[10]) == 8);
		test.Assert (octree.AddCoord (coords[11]) == 9);
		test.Assert (octree.AddCoord (coords[12]) == 10);
		
		test.Assert (octree.FindCoord (coords[0]) == 0);
		test.Assert (octree.FindCoord (coords[0]) == 0);
		test.Assert (octree.FindCoord (coords[0]) == 0);
		test.Assert (octree.FindCoord (coords[0]) == 0);
		test.Assert (octree.FindCoord (coords[0]) == 0);
		
		test.Assert (octree.FindCoord (coords[1]) == 1);
		test.Assert (octree.FindCoord (coords[2]) == 2);
		test.Assert (octree.FindCoord (coords[0]) == 0);

		test.Assert (octree.FindCoord (coords[3]) == 3);
		test.Assert (octree.FindCoord (coords[4]) == 4);
		test.Assert (octree.FindCoord (coords[5]) == 5);
		test.Assert (octree.FindCoord (coords[6]) == 6);
		test.Assert (octree.FindCoord (coords[7]) == 5);
		test.Assert (octree.FindCoord (coords[8]) == 6);
		
		test.Assert (octree.FindCoord (coords[9]) == 7);
		test.Assert (octree.FindCoord (coords[10]) == 8);
		test.Assert (octree.FindCoord (coords[11]) == 9);
		test.Assert (octree.FindCoord (coords[12]) == 10);

		test.Assert (octree.FindCoord (coords[13]) == -1);
		test.Assert (octree.FindCoord (coords[14]) == -1);
		test.Assert (octree.FindCoord (coords[15]) == -1);

		var nodeCount = 0;
		var coordCount = 0
		var coordsPerNode = {};
		JSM.TraverseOctreeNodes (octree, function (node) {
			coordsPerNode[nodeCount] = node.coords.length;
			nodeCount += 1;
			coordCount += node.coords.length;
			return true;
		});
		
		if (i == 0) {
			test.Assert (nodeCount === 1);
			test.Assert (coordsPerNode[0] == 11);
		} else if (i == 1) {
			test.Assert (nodeCount === 9);
			test.Assert (coordsPerNode[0] == 0);
			test.Assert (coordsPerNode[1] == 3);
			test.Assert (coordsPerNode[2] == 5);
			test.Assert (coordsPerNode[3] == 0);
			test.Assert (coordsPerNode[4] == 1);
			test.Assert (coordsPerNode[5] == 0);
			test.Assert (coordsPerNode[6] == 0);
			test.Assert (coordsPerNode[7] == 2);
			test.Assert (coordsPerNode[8] == 0);
		}
		test.Assert (coordCount == 11);
	}
	
	var octree = new JSM.Octree (new JSM.Box (new JSM.Coord (-1.0, -1.0, -1.0), new JSM.Coord (1.0, 1.0, 1.0)), 3);
	var coords = [
		new JSM.Coord (5.0, 1.0, 0.0),
		new JSM.Coord (5.0, 2.0, 0.0),
		new JSM.Coord (5.0, 3.0, 0.0),
		new JSM.Coord (5.0, 4.0, 0.0),
		new JSM.Coord (5.0, 5.0, 0.0),
		new JSM.Coord (5.0, 6.0, 0.0),
		new JSM.Coord (5.0, 7.0, 0.0)	
	];
	
	test.Assert (octree.AddCoord (coords[0]) == 0);
	test.Assert (octree.AddCoord (coords[1]) == 1);
	test.Assert (octree.AddCoord (coords[2]) == 2);
	test.Assert (octree.AddCoord (coords[3]) == 3);
	test.Assert (octree.AddCoord (coords[4]) == 4);
	test.Assert (octree.AddCoord (coords[5]) == 5);
	test.Assert (octree.AddCoord (coords[6]) == 6);

	test.Assert (octree.FindCoord (coords[0]) == 0);
	test.Assert (octree.FindCoord (coords[1]) == 1);
	test.Assert (octree.FindCoord (coords[2]) == 2);
	test.Assert (octree.FindCoord (coords[3]) == 3);
	test.Assert (octree.FindCoord (coords[4]) == 4);
	test.Assert (octree.FindCoord (coords[5]) == 5);
	test.Assert (octree.FindCoord (coords[6]) == 6);
});

generalSuite.AddTest ('TriangleOctreeTest', function (test)
{
	function CheckCounts (octree, refNodeCount, refTriangleCount)
	{
		var nodeCount = 0;
		var triangleCount = 0
		JSM.TraverseOctreeNodes (octree, function (node) {
			nodeCount += 1;
			triangleCount += node.triangles.length;
			return true;
		});
		return (nodeCount == refNodeCount && triangleCount == refTriangleCount);		
	}
	
	var octree = new JSM.TriangleOctree (new JSM.Box (new JSM.Coord (-1.0, -1.0, -1.0), new JSM.Coord (1.0, 1.0, 1.0)));
	test.Assert (CheckCounts (octree, 1, 0));
    
	test.Assert (octree.AddTriangle (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (0.1, 0.0, 0.0), new JSM.Coord (0.1, 0.1, 0.0)));
	test.Assert (octree.AddTriangle (new JSM.Coord (0.0, 0.0, 0.5), new JSM.Coord (0.1, 0.0, 0.5), new JSM.Coord (0.1, 0.1, 0.5)));
	test.Assert (CheckCounts (octree, 73, 2));
	
	test.Assert (octree.AddTriangle (new JSM.Coord (0.0, 0.0, -0.5), new JSM.Coord (0.1, 0.0, -0.5), new JSM.Coord (0.1, 0.1, -0.5)));
	test.Assert (octree.AddTriangle (new JSM.Coord (0.5, 0.0, 0.0), new JSM.Coord (0.6, 0.0, 0.0), new JSM.Coord (0.6, 0.6, 0.0)));
	test.Assert (octree.AddTriangle (new JSM.Coord (0.5, 0.0, 0.5), new JSM.Coord (0.6, 0.0, 0.5), new JSM.Coord (0.6, 0.6, 0.5)));
	test.Assert (octree.AddTriangle (new JSM.Coord (0.5, 0.0, -0.5), new JSM.Coord (0.6, 0.0, -0.5), new JSM.Coord (0.6, 0.6, -0.5)));
	test.Assert (CheckCounts (octree, 97, 6));
	
	var octree = new JSM.TriangleOctree (new JSM.Box (new JSM.Coord (-1.0, -1.0, -1.0), new JSM.Coord (1.0, 1.0, 1.0)));
	test.Assert (octree.AddTriangle (new JSM.Coord (-1.0, -1.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0), new JSM.Coord (1.0, 1.0, 0.0), 1));
	test.Assert (CheckCounts (octree, 9, 1));
	test.Assert (octree.AddTriangle (new JSM.Coord (-1.0, -1.0, 1.0), new JSM.Coord (1.0, 0.0, 1.0), new JSM.Coord (1.0, 1.0, 1.0), 2));
	test.Assert (CheckCounts (octree, 9, 2));
	test.Assert (octree.AddTriangle (new JSM.Coord (-1.0, -1.0, -1.0), new JSM.Coord (1.0, 0.0, -1.0), new JSM.Coord (1.0, 1.0, -1.0), 3));
	test.Assert (CheckCounts (octree, 9, 3));
	test.Assert (octree.AddTriangle (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (0.1, 0.0, 0.0), new JSM.Coord (0.1, 0.1, 0.0), 4));
	test.Assert (CheckCounts (octree, 41, 4));
	
	var nodeIndex = 0;
	var trianglesPerNode = {};
	var userDataSum = 0;
	JSM.TraverseOctreeNodes (octree, function (node) {
		var i = 0;
		for (i = 0; i < node.triangles.length; i++) {
			userDataSum += node.triangles[i].userData;
		}
		trianglesPerNode[nodeIndex] = node.triangles.length;
		nodeIndex += 1;
		return true;
	});
	for (var key in trianglesPerNode) {
		if (key == 0) {
			test.Assert (trianglesPerNode[key] == 3);
		} else if (key == 18) {
			test.Assert (trianglesPerNode[key] == 1);
		} else {
			test.Assert (trianglesPerNode[key] == 0);
		}
	}
	test.Assert (userDataSum == 10);
});

var polygonSuite = unitTest.AddTestSuite ('GeometryPolygon');

polygonSuite.AddTest ('PolygonTest', function (test)
{
	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0.0, 0.0);
	polygon.AddVertex (1.0, 0.0);
	polygon.AddVertex (0.0, 1.0);
	test.Assert (JSM.IsEqual (JSM.PolygonSignedArea2D (polygon), 0.5));
	test.Assert (JSM.PolygonOrientation2D (polygon) == JSM.Orientation.CounterClockwise);
	test.Assert (JSM.PolygonComplexity2D (polygon) == JSM.Complexity.Convex);
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.2, 0.2), polygon) == 'CoordInsideOfPolygon');
	
	JSM.ChangePolygonOrientation2D (polygon);
	test.Assert (JSM.IsEqual (JSM.PolygonSignedArea2D (polygon), -0.5));
	test.Assert (JSM.PolygonOrientation2D (polygon) == JSM.Orientation.Clockwise);
	test.Assert (JSM.PolygonComplexity2D (polygon) == JSM.Complexity.Convex);
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.2, 0.2), polygon) == 'CoordInsideOfPolygon');
	
	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0.0, 0.0);
	polygon.AddVertex (1.0, 0.0);
	
	var triangles = JSM.PolygonTriangulate2D (polygon);
	test.Assert (triangles.length == 0);

	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0.0, 0.0);
	polygon.AddVertex (1.0, 0.0);
	polygon.AddVertex (1.0, 1.0);
	
	var triangles = JSM.PolygonTriangulate2D (polygon);
	test.Assert (triangles.length == 1);
	test.Assert (triangles[0].toString () == '0,1,2');
	test.Assert (JSM.CheckTriangulation2D (polygon, triangles) == true);

	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0.0, 0.0);
	polygon.AddVertex (1.0, 0.0);
	polygon.AddVertex (1.0, 1.0);
	polygon.AddVertex (0.0, 1.0);
	test.Assert (JSM.IsPolygonVertexVisible2D (polygon, 0, 2) == true);
	
	var triangles = JSM.PolygonTriangulate2D (polygon);
	test.Assert (triangles.length == 2);
	test.Assert (triangles[0].toString () == '0,1,2');
	test.Assert (triangles[1].toString () == '0,2,3');
	test.Assert (JSM.CheckTriangulation2D (polygon, triangles) == true);

	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0.0, 0.0, 0.0);
	polygon.AddVertex (1.0, 0.0, 0.0);
	polygon.AddVertex (1.0, 1.0, 0.0);
	polygon.AddVertex (0.0, 1.0, 0.0);
	var triangles = JSM.PolygonTriangulate (polygon);
	test.Assert (triangles.length == 2);
	test.Assert (triangles[0].toString () == '0,1,2');
	test.Assert (triangles[1].toString () == '0,2,3');
	
	var vertices = [
		new JSM.Coord2D (-0.5, -0.5),
		new JSM.Coord2D (0.5, -0.5),
		new JSM.Coord2D (0.5, 0.5),
		new JSM.Coord2D (0.0, 0.5),
		new JSM.Coord2D (0.0, 0.0),
		new JSM.Coord2D (-0.5, 0.0)	
	]
	
	var polygon = JSM.CreatePolygonFromVertices (vertices);
	test.Assert (polygon.VertexCount () == 6);
	
	vertices[0].x = 1.0;
	vertices[0].y = 1.0;

	test.Assert (polygon.GetVertex (0).x == -0.5 && polygon.GetVertex (0).y == -0.5);
	
	var vertices = [
		new JSM.Coord2D (-0.5, 0.0),
		new JSM.Coord2D (0.0, 0.0),
		new JSM.Coord2D (0.0, 0.5),
		new JSM.Coord2D (0.5, 0.5),
		new JSM.Coord2D (0.5, -0.5),
		new JSM.Coord2D (-0.5, -0.5),
	];
	
	var polygon = JSM.CreatePolygonFromVertices (vertices);
	test.Assert (JSM.PolygonOrientation2D (polygon) == JSM.Orientation.Clockwise);

	var polygon = JSM.CreateCCWPolygonFromVertices (vertices);
	test.Assert (JSM.PolygonOrientation2D (polygon) == JSM.Orientation.CounterClockwise);
});

polygonSuite.AddTest ('ContourPolygon2DTest', function (test)
{
	var polygon = new JSM.ContourPolygon2D ();
	test.Assert (polygon.ContourCount () == 0);
	test.Assert (polygon.VertexCount (0) == 0);
	test.Assert (polygon.VertexCount (1) == 0);
	test.Assert (polygon.VertexCount (2) == 0);
	
	polygon.AddVertex (0, 0, 0);
	polygon.AddVertex (0, 1, 0);
	polygon.AddVertex (0, 1, 1);
	test.Assert (polygon.ContourCount () == 1);
	test.Assert (polygon.VertexCount (0) == 3);
	test.Assert (polygon.VertexCount (1) == 0);
	test.Assert (polygon.VertexCount (2) == 0);

	polygon.AddVertex (1, 0, 0);
	polygon.AddVertex (1, 2, 0);
	polygon.AddVertex (1, 2, 2);
	test.Assert (polygon.ContourCount () == 2);
	test.Assert (polygon.VertexCount (0) == 3);
	test.Assert (polygon.VertexCount (1) == 3);
	test.Assert (polygon.VertexCount (2) == 0);

	polygon.AddContour ();
	test.Assert (polygon.ContourCount () == 3);
	polygon.AddVertex (2, 0, 0);
	polygon.AddVertex (2, 3, 0);
	polygon.AddVertex (2, 3, 3);
	test.Assert (polygon.ContourCount () == 3);
	test.Assert (polygon.VertexCount (0) == 3);
	test.Assert (polygon.VertexCount (1) == 3);
	test.Assert (polygon.VertexCount (2) == 3);

	test.Assert (polygon.GetVertex (0, 1).IsEqual (new JSM.Coord2D (1, 0)));
	test.Assert (polygon.GetVertex (1, 1).IsEqual (new JSM.Coord2D (2, 0)));
	test.Assert (polygon.GetVertex (2, 1).IsEqual (new JSM.Coord2D (3, 0)));
	
	var cloned = polygon.Clone ();
	test.Assert (cloned.ContourCount () == 3);
	test.Assert (cloned.VertexCount (0) == 3);
	test.Assert (cloned.VertexCount (1) == 3);
	test.Assert (cloned.VertexCount (2) == 3);

	test.Assert (cloned.GetVertex (0, 1).IsEqual (new JSM.Coord2D (1, 0)));
	test.Assert (cloned.GetVertex (1, 1).IsEqual (new JSM.Coord2D (2, 0)));
	test.Assert (cloned.GetVertex (2, 1).IsEqual (new JSM.Coord2D (3, 0)));

	cloned.SetVertex (1, 1, 5, 6);
	test.Assert (polygon.GetVertex (1, 1).IsEqual (new JSM.Coord2D (2, 0)));
	test.Assert (cloned.GetVertex (1, 1).IsEqual (new JSM.Coord2D (5, 6)));
	
	polygon.Clear ();
	test.Assert (polygon.ContourCount () == 0);
	test.Assert (polygon.VertexCount (0) == 0);
	test.Assert (polygon.VertexCount (1) == 0);
	test.Assert (polygon.VertexCount (2) == 0);
});

polygonSuite.AddTest ('CoordPolygonPosition2DTest', function (test)
{
	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0.0, 2.0);
	polygon.AddVertex (0.0, 1.0);
	polygon.AddVertex (1.0, 1.0);
	polygon.AddVertex (1.0, 0.0);
	polygon.AddVertex (2.0, 0.0);
	polygon.AddVertex (2.0, 1.0);
	polygon.AddVertex (3.0, 1.0);
	polygon.AddVertex (3.0, 2.0);
	polygon.AddVertex (1.5, 3.0);

	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.0, 0.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.5, 5.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.0, 3.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.0, 4.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (3.0, 0.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (2.5, 0.5), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (4.0, 2.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (-1.0, 1.0), polygon) == 'CoordOutsideOfPolygon');

	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.0, 1.5), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.5, 1.0), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.0, 0.5), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.5, 0.0), polygon) == 'CoordOnPolygonEdge');

	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.0, 2.0), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.0, 1.0), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.0, 1.0), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (3.0, 2.0), polygon) == 'CoordOnPolygonEdge');

	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.5, 1.5), polygon) == 'CoordInsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.5, 0.5), polygon) == 'CoordInsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.5, 1.5), polygon) == 'CoordInsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (2.5, 1.5), polygon) == 'CoordInsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.5, 1.0), polygon) == 'CoordInsideOfPolygon');
});

polygonSuite.AddTest ('PolygonVertexVisibility2DTest', function (test)
{
	function GetSector (x1, y1, x2, y2)
	{
		var beg = new JSM.Coord2D (x1, y1);
		var end = new JSM.Coord2D (x2, y2);
		var sector = new JSM.Sector2D (beg, end);
		return sector;
	}

	function GetVisibleVertices (polygon, from)
	{
		var result = [];
		for (var i = 0; i < polygon.VertexCount (); i++) {
			if (JSM.IsPolygonVertexVisible2D (polygon, from, i)) {
				result.push (i);
			}
		}
		return result;
	}

	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0.0, 0.0);
	polygon.AddVertex (3.0, 0.0);
	polygon.AddVertex (3.0, 2.0);
	polygon.AddVertex (2.0, 2.0);
	polygon.AddVertex (2.0, 1.0);
	polygon.AddVertex (1.0, 1.0);
	polygon.AddVertex (1.0, 2.0);
	polygon.AddVertex (0.0, 2.0);
	
	test.Assert (GetVisibleVertices (polygon, 0).toString () == [4, 5, 6].toString ());
	test.Assert (GetVisibleVertices (polygon, 1).toString () == [3, 4, 5].toString ());
	test.Assert (GetVisibleVertices (polygon, 2).toString () == [4].toString ());
	test.Assert (GetVisibleVertices (polygon, 3).toString () == [1].toString ());
	test.Assert (GetVisibleVertices (polygon, 4).toString () == [0, 1, 2].toString ());
	test.Assert (GetVisibleVertices (polygon, 5).toString () == [0, 1, 7].toString ());
	test.Assert (GetVisibleVertices (polygon, 6).toString () == [0].toString ());
	test.Assert (GetVisibleVertices (polygon, 7).toString () == [5].toString ());

	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (0, 0, 1, 1), 0, 5) == false);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (0, 0, 1, 1), 0, -1) == true);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (0, 0, 1, 1), -1, -1) == true);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (0, 0, 0.5, 0.5), 0, -1) == false);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (0, 0, 0.5, 0.5), -1, -1) == true);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (0.3, 0.3, 0.8, 0.8), -1, -1) == false);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (0.3, 0.3, 1, 1), -1, -1) == true);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (0.3, 0.3, 1.5, 1.5), -1, -1) == true);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (0.5, 1.5, 0.8, 1.5), -1, -1) == false);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (0.5, 1.5, 1, 1.5), -1, -1) == true);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (0.5, 1.5, 1, 2), -1, -1) == true);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (0.5, 1.5, 1, 2.5), -1, -1) == true);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (1.1, 1.5, 1.9, 1.5), -1, -1) == false);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (1, 2, 1.9, 1.5), -1, -1) == true);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (1, 2, 1.9, 1.5), 6, -1) == false);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (1, 2, 2, 2), -1, -1) == true);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (1, 2, 2, 2), 6, -1) == true);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon, GetSector (1, 2, 2, 2), 6, 3) == false);
	
	var polygon2 = new JSM.Polygon2D ();
	polygon2.AddVertex (118, 121);
	polygon2.AddVertex (244, 89);
	polygon2.AddVertex (188, 222);
	polygon2.AddVertex (104, 219);
	polygon2.AddVertex (135, 139);
	polygon2.AddVertex (167, 140);
	polygon2.AddVertex (152, 189);
	polygon2.AddVertex (170, 189);
	polygon2.AddVertex (192, 118);
	
	test.Assert (JSM.IsPolygonVertexVisible2D (polygon2, 1, 4) == false);

	var polygon3 = new JSM.Polygon2D ();
	polygon3.AddVertex (1, 0);
	polygon3.AddVertex (2, 0);
	polygon3.AddVertex (2, 1);
	polygon3.AddVertex (3, 1);
	polygon3.AddVertex (3, 2);
	polygon3.AddVertex (2, 2);
	polygon3.AddVertex (2, 3);
	polygon3.AddVertex (1, 3);
	polygon3.AddVertex (1, 2);
	polygon3.AddVertex (0, 2);
	polygon3.AddVertex (0, 1);
	polygon3.AddVertex (1, 1);
	
	test.Assert (GetVisibleVertices (polygon3, 0).toString () == [2, 5, 6].toString ());
	test.Assert (GetVisibleVertices (polygon3, 1).toString () == [7, 8, 11].toString ());
	test.Assert (GetVisibleVertices (polygon3, 2).toString () == [0, 4, 5, 7, 8, 9, 11].toString ());
	test.Assert (GetVisibleVertices (polygon3, 3).toString () == [5, 8, 9].toString ());
	test.Assert (GetVisibleVertices (polygon3, 4).toString () == [2, 10, 11].toString ());
	test.Assert (GetVisibleVertices (polygon3, 5).toString () == [0, 2, 3, 7, 8, 10, 11].toString ());
	test.Assert (GetVisibleVertices (polygon3, 6).toString () == [0, 8, 11].toString ());
	test.Assert (GetVisibleVertices (polygon3, 7).toString () == [1, 2, 5].toString ());
	test.Assert (GetVisibleVertices (polygon3, 8).toString () == [1, 2, 3, 5, 6, 10, 11].toString ());
	test.Assert (GetVisibleVertices (polygon3, 10).toString () == [4, 5, 8].toString ());
	test.Assert (GetVisibleVertices (polygon3, 11).toString () == [1, 2, 4, 5, 6, 8, 9].toString ());

	var polygon4 = new JSM.Polygon2D ();
	polygon4.AddVertex (0, 0);
	polygon4.AddVertex (3, 0);
	polygon4.AddVertex (3, 3);
	polygon4.AddVertex (0, 3);
	
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon4, GetSector (0, 0, 1, 1), -1, -1) == true);
	test.Assert (JSM.SectorIntersectsPolygon2D (polygon4, GetSector (0, 0, 1, 1), 0, -1) == false);
});

polygonSuite.AddTest ('PolygonTriangulation2DTest', function (test)
{
	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0.0, 0.0);
	polygon.AddVertex (3.0, 0.0);
	polygon.AddVertex (3.0, 2.0);
	polygon.AddVertex (1.5, 3.0);
	polygon.AddVertex (0.0, 2.0);
	
	var triangles = JSM.PolygonTriangulate2D (polygon);
	test.Assert (JSM.CheckTriangulation2D (polygon, triangles));
	test.Assert (triangles.length == 3);
	test.Assert (triangles[0].toString () == [0, 1, 2].toString ());
	test.Assert (triangles[1].toString () == [0, 2, 3].toString ());
	test.Assert (triangles[2].toString () == [0, 3, 4].toString ());

	var polygon2 = new JSM.Polygon2D ();
	polygon2.AddVertex (0.0, 0.0);
	polygon2.AddVertex (3.0, 0.0);
	polygon2.AddVertex (3.0, 2.0);
	polygon2.AddVertex (2.0, 2.0);
	polygon2.AddVertex (2.0, 1.0);
	polygon2.AddVertex (1.0, 1.0);
	polygon2.AddVertex (1.0, 2.0);
	polygon2.AddVertex (0.0, 2.0);
	
	var triangles = JSM.PolygonTriangulate2D (polygon2);
	test.Assert (JSM.CheckTriangulation2D (polygon2, triangles));
	test.Assert (triangles.length == 6);
	test.Assert (triangles[0].toString () == [1, 4, 0].toString ());
	test.Assert (triangles[1].toString () == [5, 0, 4].toString ());
	test.Assert (triangles[2].toString () == [2, 4, 1].toString ());
	test.Assert (triangles[3].toString () == [4, 2, 3].toString ());
	test.Assert (triangles[4].toString () == [6, 0, 5].toString ());
	test.Assert (triangles[5].toString () == [0, 6, 7].toString ());
	
	var polygon2cw = new JSM.Polygon2D ();
	polygon2cw.AddVertex (0.0, 0.0);
	polygon2cw.AddVertex (0.0, 2.0);
	polygon2cw.AddVertex (1.0, 2.0);
	polygon2cw.AddVertex (1.0, 1.0);
	polygon2cw.AddVertex (2.0, 1.0);
	polygon2cw.AddVertex (2.0, 2.0);
	polygon2cw.AddVertex (3.0, 2.0);
	polygon2cw.AddVertex (3.0, 0.0);
	
	var triangles = JSM.PolygonTriangulate2D (polygon2cw);
	test.Assert (JSM.CheckTriangulation2D (polygon2cw, triangles));
	test.Assert (triangles.length == 6);
	test.Assert (triangles[0].toString () == [6, 7, 5].toString ());
	test.Assert (triangles[1].toString () == [5, 7, 4].toString ());
	test.Assert (triangles[2].toString () == [4, 7, 3].toString ());
	test.Assert (triangles[3].toString () == [2, 3, 1].toString ());
	test.Assert (triangles[4].toString () == [1, 3, 0].toString ());
	test.Assert (triangles[5].toString () == [7, 0, 3].toString ());

	var polygon3 = new JSM.Polygon2D ();
	polygon3.AddVertex (0.0, 0.0);
	polygon3.AddVertex (5.0, 0.0);
	polygon3.AddVertex (5.0, 1.0);
	polygon3.AddVertex (1.0, 1.0);
	polygon3.AddVertex (1.0, 5.0);
	polygon3.AddVertex (4.0, 5.0);
	polygon3.AddVertex (4.0, 3.0);
	polygon3.AddVertex (3.0, 3.0);
	polygon3.AddVertex (3.0, 4.0);
	polygon3.AddVertex (2.0, 4.0);
	polygon3.AddVertex (2.0, 2.0);
	polygon3.AddVertex (5.0, 2.0);
	polygon3.AddVertex (5.0, 6.0);
	polygon3.AddVertex (0.0, 6.0);

	var triangles = JSM.PolygonTriangulate2D (polygon3);
	test.Assert (JSM.CheckTriangulation2D (polygon3, triangles));
	test.Assert (triangles.length == 12);
	test.Assert (triangles[0].toString () == [2, 0, 1].toString ());
	test.Assert (triangles[1].toString () == [3, 0, 2].toString ());
	test.Assert (triangles[2].toString () == [4, 0, 3].toString ());
	test.Assert (triangles[3].toString () == [5, 12, 4].toString ());
	test.Assert (triangles[4].toString () == [13, 4, 12].toString ());
	test.Assert (triangles[5].toString () == [4, 13, 0].toString ());
	test.Assert (triangles[6].toString () == [6, 12, 5].toString ());
	test.Assert (triangles[7].toString () == [7, 10, 6].toString ());
	test.Assert (triangles[8].toString () == [11, 6, 10].toString ());
	test.Assert (triangles[9].toString () == [6, 11, 12].toString ());
	test.Assert (triangles[10].toString () == [8, 10, 7].toString ());
	test.Assert (triangles[11].toString () == [10, 8, 9].toString ());

	var polygon4 = new JSM.Polygon2D ();
	polygon4.AddVertex (52, 221);
	polygon4.AddVertex (101, 89);
	polygon4.AddVertex (244, 89);
	polygon4.AddVertex (188, 222);
	polygon4.AddVertex (104, 219);
	polygon4.AddVertex (135, 139);
	polygon4.AddVertex (167, 140);
	polygon4.AddVertex (152, 189);
	polygon4.AddVertex (170, 189);
	polygon4.AddVertex (192, 118);
	polygon4.AddVertex (118, 121);
	polygon4.AddVertex (77, 223);
	
	var triangles = JSM.PolygonTriangulate2D (polygon4);
	test.Assert (JSM.CheckTriangulation2D (polygon4, triangles));
	test.Assert (triangles.length == 10);

	var polygon5 = new JSM.Polygon2D ();
	polygon5.AddVertex (1, 0);
	polygon5.AddVertex (2, 0);
	polygon5.AddVertex (2, 1);
	polygon5.AddVertex (3, 1);
	polygon5.AddVertex (3, 2);
	polygon5.AddVertex (2, 2);
	polygon5.AddVertex (2, 3);
	polygon5.AddVertex (1, 3);
	polygon5.AddVertex (1, 2);
	polygon5.AddVertex (0, 2);
	polygon5.AddVertex (0, 1);
	polygon5.AddVertex (1, 1);	

	var triangles = JSM.PolygonTriangulate2D (polygon5);
	test.Assert (JSM.CheckTriangulation2D (polygon5, triangles));
	test.Assert (triangles.length == 10);
	test.Assert (triangles[0].toString () == [2, 0, 1].toString ());
	test.Assert (triangles[1].toString () == [2, 5, 0].toString ());
	test.Assert (triangles[2].toString () == [6, 0, 5].toString ());
	test.Assert (triangles[3].toString () == [3, 5, 2].toString ());
	test.Assert (triangles[4].toString () == [5, 3, 4].toString ());
	test.Assert (triangles[5].toString () == [8, 6, 7].toString ());
	test.Assert (triangles[6].toString () == [6, 11, 0].toString ());
	test.Assert (triangles[7].toString () == [8, 11, 6].toString ());
	test.Assert (triangles[8].toString () == [9, 11, 8].toString ());
	test.Assert (triangles[9].toString () == [11, 9, 10].toString ());
});

polygonSuite.AddTest ('PolygonTriangulationTest', function (test)
{
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0.0, 0.0, 0.0);
	polygon.AddVertex (3.0, 0.0, 0.0);
	polygon.AddVertex (3.0, 2.0, 0.0);
	polygon.AddVertex (1.5, 3.0, 0.0);
	polygon.AddVertex (0.0, 2.0, 0.0);
	
	var triangles = JSM.PolygonTriangulate (polygon);
	test.Assert (triangles.length == 3);
	test.Assert (triangles[0].toString () == [0, 1, 2].toString ());
	test.Assert (triangles[1].toString () == [0, 2, 3].toString ());
	test.Assert (triangles[2].toString () == [0, 3, 4].toString ());
});

polygonSuite.AddTest ('PolygonOffsetTest', function (test)
{
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0.0, 0.0, 0.0);
	polygon.AddVertex (1.0, 0.0, 0.0);
	polygon.AddVertex (1.0, 1.0, 0.0);
	polygon.AddVertex (0.0, 1.0, 0.0);
	
	var offseted = JSM.OffsetPolygonContour (polygon, 0.2);
	test.Assert (offseted.vertices[0].IsEqual (new JSM.Coord (0.2, 0.2, 0.0)));
	test.Assert (offseted.vertices[1].IsEqual (new JSM.Coord (0.8, 0.2, 0.0)));
	test.Assert (offseted.vertices[2].IsEqual (new JSM.Coord (0.8, 0.8, 0.0)));
	test.Assert (offseted.vertices[3].IsEqual (new JSM.Coord (0.2, 0.8, 0.0)));

	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0.0, 0.0, 0.0);
	polygon.AddVertex (2.0, 0.0, 0.0);
	polygon.AddVertex (2.0, 1.0, 0.0);
	polygon.AddVertex (1.0, 1.0, 0.0);
	polygon.AddVertex (1.0, 2.0, 0.0);
	
	var offseted = JSM.OffsetPolygonContour (polygon, 0.2);
	test.Assert (offseted.vertices[0].IsEqual (new JSM.Coord (0.32360679774997897, 0.2, 0.0)));
	test.Assert (offseted.vertices[1].IsEqual (new JSM.Coord (1.8, 0.2, 0.0)));
	test.Assert (offseted.vertices[2].IsEqual (new JSM.Coord (1.8, 0.8, 0.0)));
	test.Assert (offseted.vertices[3].IsEqual (new JSM.Coord (0.8, 0.8, 0.0)));
	test.Assert (offseted.vertices[4].IsEqual (new JSM.Coord (0.8, 1.1527864045000422, 0.0)));
});

polygonSuite.AddTest ('PolygonWithHole2DTest', function (test)
{
	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0, 0);
	polygon.AddVertex (3, 0);
	polygon.AddVertex (3, 3);
	polygon.AddVertex (0, 3);
	polygon.AddVertex (0, 0);
	polygon.AddVertex (1, 1);
	polygon.AddVertex (1, 2);
	polygon.AddVertex (2, 2);
	polygon.AddVertex (2, 1);
	polygon.AddVertex (1, 1);

	test.Assert (JSM.IsEqual (JSM.PolygonSignedArea2D (polygon), 8.0));

	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.0, 0.0), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.0, 1.0), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (2.0, 2.0), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (3.0, 3.0), polygon) == 'CoordOnPolygonEdge');

	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (-1.0, -1.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (4.0, 4.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (-1.0, 1.5), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (4.0, 1.5), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.5, 1.5), polygon) == 'CoordOutsideOfPolygon');

	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.5, 0.5), polygon) == 'CoordInsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (2.5, 1.5), polygon) == 'CoordInsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.5, 2.5), polygon) == 'CoordInsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.5, 1.5), polygon) == 'CoordInsideOfPolygon');

	var triangles = JSM.PolygonTriangulate2D (polygon);
	test.Assert (JSM.CheckTriangulation2D (polygon, triangles));
	test.Assert (triangles.length == 8);
	test.Assert (triangles[0].toString () == [2, 7, 1].toString ());
	test.Assert (triangles[1].toString () == [8, 1, 7].toString ());
	test.Assert (triangles[2].toString () == [3, 7, 2].toString ());
	test.Assert (triangles[3].toString () == [9, 1, 8].toString ());
	test.Assert (triangles[4].toString () == [1, 9, 0].toString ());
	test.Assert (triangles[5].toString () == [5, 3, 4].toString ());
	test.Assert (triangles[6].toString () == [6, 3, 5].toString ());
	test.Assert (triangles[7].toString () == [3, 6, 7].toString ());

	var polygon2 = new JSM.Polygon2D ();
	polygon2.AddVertex (0, 0);
	polygon2.AddVertex (6, 0);
	polygon2.AddVertex (6, 3);
	polygon2.AddVertex (5, 2);
	polygon2.AddVertex (5, 1);
	polygon2.AddVertex (4, 1);
	polygon2.AddVertex (4, 2);
	polygon2.AddVertex (5, 2);
	polygon2.AddVertex (6, 3);
	polygon2.AddVertex (0, 3);
	polygon2.AddVertex (1, 2);
	polygon2.AddVertex (2, 2);
	polygon2.AddVertex (2, 1);
	polygon2.AddVertex (1, 1);
	polygon2.AddVertex (1, 2);
	polygon2.AddVertex (0, 3);

	test.Assert (JSM.IsEqual (JSM.PolygonSignedArea2D (polygon2), 16.0));

	var triangles = JSM.PolygonTriangulate2D (polygon2);
	test.Assert (JSM.CheckTriangulation2D (polygon2, triangles));
	test.Assert (triangles.length == 14);
	test.Assert (triangles[0].toString () == [1, 4, 0].toString ());
	test.Assert (triangles[1].toString () == [5, 0, 4].toString ());
	test.Assert (triangles[2].toString () == [2, 4, 1].toString ());
	test.Assert (triangles[3].toString () == [4, 2, 3].toString ());
	test.Assert (triangles[4].toString () == [5, 12, 0].toString ());
	test.Assert (triangles[5].toString () == [13, 0, 12].toString ());
	test.Assert (triangles[6].toString () == [6, 12, 5].toString ());
	test.Assert (triangles[7].toString () == [14, 0, 13].toString ());	
	test.Assert (triangles[8].toString () == [0, 14, 15].toString ());	
	test.Assert (triangles[9].toString () == [8, 6, 7].toString ());	
	test.Assert (triangles[10].toString () == [9, 6, 8].toString ());	
	test.Assert (triangles[11].toString () == [6, 11, 12].toString ());	
	test.Assert (triangles[12].toString () == [9, 11, 6].toString ());	
	test.Assert (triangles[13].toString () == [11, 9, 10].toString ());	

	var polygon3 = new JSM.Polygon2D ();
	polygon3.AddVertex (0, 0);
	polygon3.AddVertex (5, 0);
	polygon3.AddVertex (2.5, 5);
	polygon3.AddVertex (2, 2);
	polygon3.AddVertex (3, 2);
	polygon3.AddVertex (3, 1);
	polygon3.AddVertex (2, 1);
	polygon3.AddVertex (2, 2);
	polygon3.AddVertex (2.5, 5);

	var triangles = JSM.PolygonTriangulate2D (polygon3);
	test.Assert (JSM.CheckTriangulation2D (polygon3, triangles));
	test.Assert (triangles.length == 7);
	test.Assert (triangles[0].toString () == [1, 5, 0].toString ());
	test.Assert (triangles[1].toString () == [6, 0, 5].toString ());
	test.Assert (triangles[2].toString () == [1, 4, 5].toString ());
	test.Assert (triangles[3].toString () == [7, 0, 6].toString ());
	test.Assert (triangles[4].toString () == [0, 7, 8].toString ());
	test.Assert (triangles[5].toString () == [2, 4, 1].toString ());
	test.Assert (triangles[6].toString () == [4, 2, 3].toString ());
});

polygonSuite.AddTest ('CreatePolygonWithHole2DTest', function (test)
{
	function CreatePolygon2D (vertices, indices)
	{
		var result = new JSM.Polygon2D ();
	
		var i, vertex;
		for (i = 0; i < indices.length; i++) {
			vertex = vertices[indices[i]];
			result.AddVertex (vertex.x, vertex.y);
		}
		
		return result;
	}

	var vertices = [
		new JSM.Coord2D (0, 0),
		new JSM.Coord2D (7, 0),
		new JSM.Coord2D (7, 3),
		new JSM.Coord2D (0, 3)
	];
	
	var indices = JSM.CreatePolygonWithHole2D (vertices);
	test.Assert (indices.toString () == [0, 1, 2, 3].toString ());

	var polygon = CreatePolygon2D (vertices, indices);
	var triangles = JSM.PolygonTriangulate2D (polygon);
	test.Assert (JSM.CheckTriangulation2D (polygon, triangles));
	test.Assert (triangles.length == 2);
	test.Assert (triangles[0].toString () == [0, 1, 2].toString ());
	test.Assert (triangles[1].toString () == [0, 2, 3].toString ());
	
	var vertices = [
		new JSM.Coord2D (0, 0),
		new JSM.Coord2D (7, 0),
		new JSM.Coord2D (7, 3),
		new JSM.Coord2D (0, 3),
		null,
		new JSM.Coord2D (1, 1),
		new JSM.Coord2D (1, 2),
		new JSM.Coord2D (2, 2),
		new JSM.Coord2D (2, 1),
	];
	
	var indices = JSM.CreatePolygonWithHole2D (vertices);
	test.Assert (indices.toString () == [0, 5, 6, 7, 8, 5, 0, 1, 2, 3].toString ());

	var polygon = CreatePolygon2D (vertices, indices);
	var triangles = JSM.PolygonTriangulate2D (polygon);
	test.Assert (JSM.CheckTriangulation2D (polygon, triangles));
	test.Assert (triangles.length == 8);
	test.Assert (triangles[0].toString () == [3, 8, 2].toString ());
	test.Assert (triangles[1].toString () == [9, 2, 8].toString ());
	test.Assert (triangles[2].toString () == [4, 8, 3].toString ());
	test.Assert (triangles[3].toString () == [0, 2, 9].toString ());
	test.Assert (triangles[4].toString () == [2, 0, 1].toString ());
	test.Assert (triangles[5].toString () == [8, 6, 7].toString ());
	test.Assert (triangles[6].toString () == [4, 6, 8].toString ());
	test.Assert (triangles[7].toString () == [6, 4, 5].toString ());
	
	var vertices = [
		new JSM.Coord2D (0, 0),
		new JSM.Coord2D (7, 0),
		new JSM.Coord2D (7, 3),
		new JSM.Coord2D (0, 3),
		null,
		new JSM.Coord2D (1, 1),
		new JSM.Coord2D (1, 2),
		new JSM.Coord2D (2, 2),
		new JSM.Coord2D (2, 1),
		null,
		new JSM.Coord2D (3, 1),
		new JSM.Coord2D (3, 2),
		new JSM.Coord2D (4, 2),
		new JSM.Coord2D (4, 1),
	];
	
	var indices = JSM.CreatePolygonWithHole2D (vertices);
	test.Assert (indices.toString () == [0, 5, 6, 7, 10, 11, 12, 13, 10, 7, 8, 5, 0, 1, 2, 3].toString ());

	var polygon = CreatePolygon2D (vertices, indices);
	var triangles = JSM.PolygonTriangulate2D (polygon);
	test.Assert (JSM.CheckTriangulation2D (polygon, triangles));
	test.Assert (triangles.length == 14);
	test.Assert (triangles[0].toString () == [15, 2, 14].toString ());
	test.Assert (triangles[1].toString () == [5, 3, 4].toString ());
	test.Assert (triangles[2].toString () == [6, 14, 5].toString ());
	test.Assert (triangles[3].toString () == [0, 2, 15].toString ());
	test.Assert (triangles[4].toString () == [2, 0, 1].toString ());
	test.Assert (triangles[5].toString () == [14, 3, 5].toString ());
	test.Assert (triangles[6].toString () == [3, 14, 2].toString ());
	test.Assert (triangles[7].toString () == [7, 14, 6].toString ());
	test.Assert (triangles[8].toString () == [8, 12, 7].toString ());
	test.Assert (triangles[9].toString () == [13, 7, 12].toString ());
	test.Assert (triangles[10].toString () == [7, 13, 14].toString ());
	test.Assert (triangles[11].toString () == [12, 10, 11].toString ());
	test.Assert (triangles[12].toString () == [8, 10, 12].toString ());
	test.Assert (triangles[13].toString () == [10, 8, 9].toString ());

	var vertices = [
		new JSM.Coord2D (0, 0),
		new JSM.Coord2D (7, 0),
		new JSM.Coord2D (7, 3),
		new JSM.Coord2D (0, 3),
		null,
		new JSM.Coord2D (1, 1),
		new JSM.Coord2D (1, 2),
		new JSM.Coord2D (2, 2),
		new JSM.Coord2D (2, 1),
		null,
		new JSM.Coord2D (3, 1),
		new JSM.Coord2D (3, 2),
		new JSM.Coord2D (4, 2),
		new JSM.Coord2D (4, 1),
		null,
		new JSM.Coord2D (5, 1),
		new JSM.Coord2D (5, 2),
		new JSM.Coord2D (6, 2),
		new JSM.Coord2D (6, 1)
	];
	
	var indices = JSM.CreatePolygonWithHole2D (vertices);
	test.Assert (indices.toString () == [0, 5, 6, 7, 10, 11, 12, 15, 16, 17, 18, 15, 12, 13, 10, 7, 8, 5, 0, 1, 2, 3].toString ());

	var polygon = CreatePolygon2D (vertices, indices);
	var triangles = JSM.PolygonTriangulate2D (polygon);
	test.Assert (JSM.CheckTriangulation2D (polygon, triangles));
	test.Assert (triangles.length == 20);	
	test.Assert (triangles[0].toString () == [21, 2, 20].toString ());
	test.Assert (triangles[1].toString () == [5, 3, 4].toString ());
	test.Assert (triangles[2].toString () == [0, 2, 21].toString ());
	test.Assert (triangles[3].toString () == [2, 0, 1].toString ());
	test.Assert (triangles[4].toString () == [20, 3, 5].toString ());
	test.Assert (triangles[5].toString () == [3, 20, 2].toString ());
	test.Assert (triangles[6].toString () == [8, 6, 7].toString ());
	test.Assert (triangles[7].toString () == [9, 20, 8].toString ());
	test.Assert (triangles[8].toString () == [20, 6, 8].toString ());
	test.Assert (triangles[9].toString () == [6, 20, 5].toString ());
	test.Assert (triangles[10].toString () == [10, 20, 9].toString ());
	test.Assert (triangles[11].toString () == [11, 18, 10].toString ());
	test.Assert (triangles[12].toString () == [19, 10, 18].toString ());
	test.Assert (triangles[13].toString () == [10, 19, 20].toString ());
	test.Assert (triangles[14].toString () == [11, 13, 18].toString ());
	test.Assert (triangles[15].toString () == [13, 11, 12].toString ());
	test.Assert (triangles[16].toString () == [14, 18, 13].toString ());
	test.Assert (triangles[17].toString () == [18, 16, 17].toString ());
	test.Assert (triangles[18].toString () == [14, 16, 18].toString ());
	test.Assert (triangles[19].toString () == [16, 14, 15].toString ());

	var vertices = [
		new JSM.Coord2D (300.8485412597656, 319.4265441894531),
		new JSM.Coord2D (338.24835205078125, 396.81103515625),
		new JSM.Coord2D (421.9165954589844, 416.66839599609375),
		new JSM.Coord2D (489.1433410644531, 362.9385986328125),
		new JSM.Coord2D (489.543701171875, 276.95245361328125),
		new JSM.Coord2D (422.18115234375, 223.48004150390625),
		new JSM.Coord2D (337.93084716796875, 241.53892517089844),
        null,
		new JSM.Coord2D (400.6557922363281, 231.74929809570312),
		new JSM.Coord2D (468.43548583984375, 264.9992980957031),
		new JSM.Coord2D (484.7142639160156, 338.9593505859375),
		new JSM.Coord2D (437.7185363769531, 398.06951904296875),
		new JSM.Coord2D (362.0542297363281, 397.45257568359375),
		new JSM.Coord2D (315.2279052734375, 338.1394348144531),
		new JSM.Coord2D (332.49664306640625, 264.4938659667969)
	];
	
	var indices = JSM.CreatePolygonWithHole2D (vertices);
	test.Assert (indices.toString () == [0, 13, 14, 8, 9, 10, 11, 12, 13, 0, 1, 2, 3, 4, 5, 6].toString ());
});

polygonSuite.AddTest ('CreatePolygonWithHoleTest', function (test)
{
	function CreatePolygon (vertices, indices)
	{
		var result = new JSM.Polygon ();
	
		var i, vertex;
		for (i = 0; i < indices.length; i++) {
			vertex = vertices[indices[i]];
			result.AddVertex (vertex.x, vertex.y, vertex.z);
		}
		
		return result;
	}

	var i, j;
	for (i = 0; i <= 3; i++) {
		var vertices = [
			new JSM.Coord (0, 0, 0),
			new JSM.Coord (7, 0, 0),
			new JSM.Coord (7, 3, 0),
			new JSM.Coord (0, 3, 0),
			null,
			new JSM.Coord (1, 1, 0),
			new JSM.Coord (1, 2, 0),
			new JSM.Coord (2, 2, 0),
			new JSM.Coord (2, 1, 0),
			null,
			new JSM.Coord (3, 1, 0),
			new JSM.Coord (3, 2, 0),
			new JSM.Coord (4, 2, 0),
			new JSM.Coord (4, 1, 0),
			null,
			new JSM.Coord (5, 1, 0),
			new JSM.Coord (5, 2, 0),
			new JSM.Coord (6, 2, 0),
			new JSM.Coord (6, 1, 0)
		];
		
		if (i > 0) {
			var transformation;
			if (i == 1) {
				transformation = new JSM.RotationXTransformation (90.0 * JSM.DegRad);
			} else if (i == 2) {
				transformation = new JSM.RotationYTransformation (90.0 * JSM.DegRad);
			} else if (i == 3) {
				transformation = new JSM.RotationZTransformation (90.0 * JSM.DegRad);
			}
			var j;
			for (j = 0; j < vertices.length; j++) {
				if (vertices[j] !== null) {
					vertices[j] = transformation.Apply (vertices[j]);
				}
			}
		}
		
		var indices = JSM.CreatePolygonWithHole (vertices);
		test.Assert (indices.toString () == [0, 5, 6, 7, 10, 11, 12, 15, 16, 17, 18, 15, 12, 13, 10, 7, 8, 5, 0, 1, 2, 3].toString ());

		var polygon = CreatePolygon (vertices, indices);
		var triangles = JSM.PolygonTriangulate (polygon);
		test.Assert (triangles.length == 20);	
		test.Assert (triangles[0].toString () == [21, 2, 20].toString ());
		test.Assert (triangles[1].toString () == [5, 3, 4].toString ());
		test.Assert (triangles[2].toString () == [0, 2, 21].toString ());
		test.Assert (triangles[3].toString () == [2, 0, 1].toString ());
		test.Assert (triangles[4].toString () == [20, 3, 5].toString ());
		test.Assert (triangles[5].toString () == [3, 20, 2].toString ());
		test.Assert (triangles[6].toString () == [8, 6, 7].toString ());
		test.Assert (triangles[7].toString () == [9, 20, 8].toString ());
		test.Assert (triangles[8].toString () == [20, 6, 8].toString ());
		test.Assert (triangles[9].toString () == [6, 20, 5].toString ());
		test.Assert (triangles[10].toString () == [10, 20, 9].toString ());
		test.Assert (triangles[11].toString () == [11, 18, 10].toString ());
		test.Assert (triangles[12].toString () == [19, 10, 18].toString ());
		test.Assert (triangles[13].toString () == [10, 19, 20].toString ());
		test.Assert (triangles[14].toString () == [11, 13, 18].toString ());
		test.Assert (triangles[15].toString () == [13, 11, 12].toString ());
		test.Assert (triangles[16].toString () == [14, 18, 13].toString ());
		test.Assert (triangles[17].toString () == [18, 16, 17].toString ());
		test.Assert (triangles[18].toString () == [14, 16, 18].toString ());
		test.Assert (triangles[19].toString () == [16, 14, 15].toString ());
	}	
});

polygonSuite.AddTest ('TriangulationWithHole2DTest', function (test) {
	function TestTriangulation (basePolygon, refIndices)
	{
		var polygonIndices = JSM.CreatePolygonWithHole2D (basePolygon);
		if (polygonIndices.toString () != refIndices.toString ()) {
			return false;
		}
		var polygon = new JSM.Polygon2D ();
		var i, vertex;
		for (i = 0; i < polygonIndices.length; i++) {
			vertex = basePolygon[polygonIndices[i]];
			polygon.AddVertex (vertex.x, vertex.y);
		}
		var triangles = JSM.PolygonTriangulate2D (polygon);	
		if (!JSM.CheckTriangulation2D (polygon, triangles)) {
			return false;
		}
		return true;
	}

	var basePolygon = [
		new JSM.Coord2D (14.406249999999998, 0.004463199991732836),
		new JSM.Coord2D (12.273693084716795, -0.13337911665439606),
		new JSM.Coord2D (10.177939414978026, -0.5507046580314636),
		new JSM.Coord2D (8.158322334289549, -1.2485805749893188),
		new JSM.Coord2D (6.256920814514159, -2.2232589721679688),
		new JSM.Coord2D (4.518617153167724, -3.4653913974761963),
		new JSM.Coord2D (2.992141485214233, -4.959873676300049),
		new JSM.Coord2D (1.7292572259902952, -6.682513236999512),
		new JSM.Coord2D (0.7823054790496825, -8.596776962280273),
		new JSM.Coord2D (0.19680410623550412, -10.650409698486328),
		new JSM.Coord2D (2.7840769689646545e-9, -12.77676773071289),
		new JSM.Coord2D (2.7840769689646545e-9, -58.87051773071289),
		new JSM.Coord2D (0.19683623313903806, -60.99687194824219),
		new JSM.Coord2D (0.782375395298004, -63.05048370361328),
		new JSM.Coord2D (1.7292767763137815, -64.96475982666016),
		new JSM.Coord2D (2.992123126983642, -66.68743133544922),
		new JSM.Coord2D (4.5186753273010245, -68.18182373046875),
		new JSM.Coord2D (6.256915569305419, -69.42404174804688),
		new JSM.Coord2D (8.158330917358397, -70.398681640625),
		new JSM.Coord2D (10.17793846130371, -71.0965805053711),
		new JSM.Coord2D (12.273698806762694, -71.51383209228516),
		new JSM.Coord2D (14.406246185302733, -71.65176391601562),
		new JSM.Coord2D (385.18749999999994, -71.65176391601562),
		new JSM.Coord2D (387.32006835937494, -71.513916015625),
		new JSM.Coord2D (389.41580200195307, -71.0965805053711),
		new JSM.Coord2D (391.43542480468744, -70.398681640625),
		new JSM.Coord2D (393.33679199218744, -69.42398071289062),
		new JSM.Coord2D (395.0751342773437, -68.18187713623047),
		new JSM.Coord2D (396.6016235351562, -66.6874008178711),
		new JSM.Coord2D (397.86450195312494, -64.96475982666016),
		new JSM.Coord2D (398.8114624023437, -63.050498962402344),
		new JSM.Coord2D (399.39697265624994, -60.99687576293945),
		new JSM.Coord2D (399.59374999999994, -58.870513916015625),
		new JSM.Coord2D (399.59374999999994, -12.776763916015625),
		new JSM.Coord2D (399.39688110351557, -10.650407791137695),
		new JSM.Coord2D (398.8113708496093, -8.596782684326172),
		new JSM.Coord2D (397.8644714355468, -6.682509422302246),
		new JSM.Coord2D (396.6016235351562, -4.95983362197876),
		new JSM.Coord2D (395.07510375976557, -3.465416193008423),
		new JSM.Coord2D (393.3368530273437, -2.223223924636841),
		new JSM.Coord2D (391.43542480468744, -1.2485815286636353),
		new JSM.Coord2D (389.41580200195307, -0.5506518483161926),
		new JSM.Coord2D (387.3200378417968, -0.13342222571372986),
		new JSM.Coord2D (385.18749999999994, 0.004486083984375),
		null,
		new JSM.Coord2D (357.99999999999994, -10.651786804199219),
		new JSM.Coord2D (360.0240173339843, -10.729362487792969),
		new JSM.Coord2D (362.0359497070312, -10.963029861450195),
		new JSM.Coord2D (364.0234985351562, -11.353105545043945),
		new JSM.Coord2D (365.97412109374994, -11.898651123046875),
		new JSM.Coord2D (367.87536621093744, -12.597009658813477),
		new JSM.Coord2D (369.7149047851562, -13.44465446472168),
		new JSM.Coord2D (371.4808044433593, -14.436634063720703),
		new JSM.Coord2D (373.1611938476562, -15.567431449890137),
		new JSM.Coord2D (374.7445983886718, -16.83041000366211),
		new JSM.Coord2D (376.2197875976562, -18.21826934814453),
		new JSM.Coord2D (377.57568359374994, -19.722864151000977),
		new JSM.Coord2D (378.80154418945307, -21.335163116455078),
		new JSM.Coord2D (379.88711547851557, -23.0450382232666),
		new JSM.Coord2D (380.82266235351557, -24.84136199951172),
		new JSM.Coord2D (381.5994262695312, -26.711843490600586),
		new JSM.Coord2D (382.2098999023437, -28.642974853515625),
		new JSM.Coord2D (382.64871215820307, -30.620220184326172),
		new JSM.Coord2D (382.91235351562494, -32.628326416015625),
		new JSM.Coord2D (382.99999999999994, -34.65178680419922),
		new JSM.Coord2D (382.91235351562494, -36.67523956298828),
		new JSM.Coord2D (382.6486206054687, -38.68333053588867),
		new JSM.Coord2D (382.2098083496093, -40.660552978515625),
		new JSM.Coord2D (381.59924316406244, -42.591670989990234),
		new JSM.Coord2D (380.8226013183593, -44.46219253540039),
		new JSM.Coord2D (379.8871459960937, -46.258583068847656),
		new JSM.Coord2D (378.8015747070312, -47.96845626831055),
		new JSM.Coord2D (377.5756530761718, -49.58070755004883),
		new JSM.Coord2D (376.2197875976562, -51.08530807495117),
		new JSM.Coord2D (374.7445983886718, -52.47315979003906),
		new JSM.Coord2D (373.16116333007807, -53.73616027832031),
		new JSM.Coord2D (371.4807739257812, -54.86695861816406),
		new JSM.Coord2D (369.7149353027343, -55.85900115966797),
		new JSM.Coord2D (367.87536621093744, -56.70659255981445),
		new JSM.Coord2D (365.97412109374994, -57.405006408691406),
		new JSM.Coord2D (364.0234985351562, -57.95049285888672),
		new JSM.Coord2D (362.0359497070312, -58.340576171875),
		new JSM.Coord2D (360.0239868164062, -58.574188232421875),
		new JSM.Coord2D (357.99999999999994, -58.65178680419922),
		new JSM.Coord2D (355.97598266601557, -58.57420349121094),
		new JSM.Coord2D (353.9640502929687, -58.340545654296875),
		new JSM.Coord2D (351.9765014648437, -57.95048141479492),
		new JSM.Coord2D (350.02587890624994, -57.40494155883789),
		new JSM.Coord2D (348.12463378906244, -56.706573486328125),
		new JSM.Coord2D (346.2850952148437, -55.85893249511719),
		new JSM.Coord2D (344.51919555664057, -54.866943359375),
		new JSM.Coord2D (342.8388061523437, -53.73613357543945),
		new JSM.Coord2D (341.25537109374994, -52.47316360473633),
		new JSM.Coord2D (339.78018188476557, -51.085304260253906),
		new JSM.Coord2D (338.4242858886718, -49.58070755004883),
		new JSM.Coord2D (337.1984252929687, -47.968421936035156),
		new JSM.Coord2D (336.1128845214843, -46.25852584838867),
		new JSM.Coord2D (335.1773071289062, -44.462196350097656),
		new JSM.Coord2D (334.40054321289057, -42.591712951660156),
		new JSM.Coord2D (333.79003906249994, -40.66058349609375),
		new JSM.Coord2D (333.3512878417968, -38.68334197998047),
		new JSM.Coord2D (333.08764648437494, -36.675235748291016),
		new JSM.Coord2D (332.99999999999994, -34.65178680419922),
		new JSM.Coord2D (333.08764648437494, -32.62833023071289),
		new JSM.Coord2D (333.3513793945312, -30.620243072509766),
		new JSM.Coord2D (333.79019165039057, -28.643016815185547),
		new JSM.Coord2D (334.4007263183593, -26.711898803710938),
		new JSM.Coord2D (335.17736816406244, -24.84137725830078),
		new JSM.Coord2D (336.11282348632807, -23.044984817504883),
		new JSM.Coord2D (337.1984252929687, -21.33512306213379),
		new JSM.Coord2D (338.42434692382807, -19.722867965698242),
		new JSM.Coord2D (339.7802429199218, -18.2182674407959),
		new JSM.Coord2D (341.25540161132807, -16.830411911010742),
		new JSM.Coord2D (342.8388061523437, -15.567415237426758),
		new JSM.Coord2D (344.51919555664057, -14.436615943908691),
		new JSM.Coord2D (346.28506469726557, -13.444568634033203),
		new JSM.Coord2D (348.12466430664057, -12.596980094909668),
		new JSM.Coord2D (350.02587890624994, -11.8985595703125),
		new JSM.Coord2D (351.9765014648437, -11.353080749511719),
		new JSM.Coord2D (353.9640502929687, -10.962987899780273),
		new JSM.Coord2D (355.9760131835937, -10.729391098022461),
		null,
		new JSM.Coord2D (45.84374999999999, -10.683036804199219),
		new JSM.Coord2D (47.88229370117187, -10.759542465209961),
		new JSM.Coord2D (49.909187316894524, -10.990069389343262),
		new JSM.Coord2D (51.91246795654296, -11.375129699707031),
		new JSM.Coord2D (53.879959106445305, -11.913954734802246),
		new JSM.Coord2D (55.799419403076165, -12.604604721069336),
		new JSM.Coord2D (57.658760070800774, -13.443743705749512),
		new JSM.Coord2D (59.44597625732422, -14.427173614501953),
		new JSM.Coord2D (61.14910888671875, -15.54993724822998),
		new JSM.Coord2D (62.75645065307617, -16.805988311767578),
		new JSM.Coord2D (64.25637817382811, -18.188514709472656),
		new JSM.Coord2D (65.63724517822264, -19.689943313598633),
		new JSM.Coord2D (66.88774108886717, -21.301536560058594),
		new JSM.Coord2D (67.99694824218749, -23.013425827026367),
		new JSM.Coord2D (68.9541778564453, -24.814687728881836),
		new JSM.Coord2D (69.74999237060545, -26.69283676147461),
		new JSM.Coord2D (70.37625885009764, -28.63409423828125),
		new JSM.Coord2D (70.82669067382811, -30.623504638671875),
		new JSM.Coord2D (71.09741210937499, -32.64522933959961),
		new JSM.Coord2D (71.18749999999999, -34.68303298950195),
		new JSM.Coord2D (71.09748077392577, -36.72084426879883),
		new JSM.Coord2D (70.82672882080077, -38.74257278442383),
		new JSM.Coord2D (70.37628936767577, -40.731990814208984),
		new JSM.Coord2D (69.7500534057617, -42.67326354980469),
		new JSM.Coord2D (68.95420837402342, -44.55139923095703),
		new JSM.Coord2D (67.99696350097655, -46.3526496887207),
		new JSM.Coord2D (66.88782501220702, -48.06458282470703),
		new JSM.Coord2D (65.63726806640624, -49.67613983154297),
		new JSM.Coord2D (64.25634765624999, -51.17751693725586),
		new JSM.Coord2D (62.75646209716797, -52.56009292602539),
		new JSM.Coord2D (61.14913558959961, -53.816165924072266),
		new JSM.Coord2D (59.44598388671875, -54.93890380859375),
		new JSM.Coord2D (57.65877532958984, -55.9223518371582),
		new JSM.Coord2D (55.799427032470696, -56.761478424072266),
		new JSM.Coord2D (53.87994766235351, -57.45206832885742),
		new JSM.Coord2D (51.912464141845696, -57.99094009399414),
		new JSM.Coord2D (49.90919876098632, -58.37601852416992),
		new JSM.Coord2D (47.882305145263665, -58.60653305053711),
		new JSM.Coord2D (45.843757629394524, -58.68303298950195),
		new JSM.Coord2D (43.80521011352538, -58.60653305053711),
		new JSM.Coord2D (41.77831649780273, -58.37600326538086),
		new JSM.Coord2D (39.77503585815429, -57.99094009399414),
		new JSM.Coord2D (37.807544708251946, -57.45210647583008),
		new JSM.Coord2D (35.88808059692382, -56.761451721191406),
		new JSM.Coord2D (34.02873992919921, -55.92230987548828),
		new JSM.Coord2D (32.241523742675774, -54.93888473510742),
		new JSM.Coord2D (30.53838539123535, -53.81612777709961),
		new JSM.Coord2D (28.931024551391598, -52.56009292602539),
		new JSM.Coord2D (27.431098937988278, -51.17756652832031),
		new JSM.Coord2D (26.05021476745605, -49.676151275634766),
		new JSM.Coord2D (24.799709320068356, -48.06455612182617),
		new JSM.Coord2D (23.690509796142575, -46.3526611328125),
		new JSM.Coord2D (22.73331260681152, -44.55138397216797),
		new JSM.Coord2D (21.937499999999996, -42.67323303222656),
		new JSM.Coord2D (21.31124114990234, -40.731971740722656),
		new JSM.Coord2D (20.860818862915036, -38.7425537109375),
		new JSM.Coord2D (20.590082168579098, -36.720829010009766),
		new JSM.Coord2D (20.500007629394528, -34.68303298950195),
		new JSM.Coord2D (20.590051651000973, -32.645225524902344),
		new JSM.Coord2D (20.860799789428707, -30.623497009277344),
		new JSM.Coord2D (21.311223983764645, -28.634075164794922),
		new JSM.Coord2D (21.93748092651367, -26.692811965942383),
		new JSM.Coord2D (22.733314514160153, -24.814674377441406),
		new JSM.Coord2D (23.69057464599609, -23.013431549072266),
		new JSM.Coord2D (24.799715042114254, -21.301498413085938),
		new JSM.Coord2D (26.050258636474606, -19.6899356842041),
		new JSM.Coord2D (27.431152343749996, -18.188535690307617),
		new JSM.Coord2D (28.931035995483395, -16.80597496032715),
		new JSM.Coord2D (30.538366317749023, -15.549915313720703),
		new JSM.Coord2D (32.24151229858398, -14.427176475524902),
		new JSM.Coord2D (34.02872085571288, -13.443732261657715),
		new JSM.Coord2D (35.888069152832024, -12.604608535766602),
		new JSM.Coord2D (37.80755233764648, -11.914011001586914),
		new JSM.Coord2D (39.77502822875976, -11.375136375427246),
		new JSM.Coord2D (41.7782859802246, -10.990045547485352),
		new JSM.Coord2D (43.80519485473632, -10.75953197479248),
		null,
		new JSM.Coord2D (107.71874999999999, -10.683036804199219),
		new JSM.Coord2D (295.56249999999994, -10.683036804199219),
		new JSM.Coord2D (297.7281188964843, -10.829914093017578),
		new JSM.Coord2D (299.85278320312494, -11.273558616638184),
		new JSM.Coord2D (301.8931274414062, -12.013519287109375),
		new JSM.Coord2D (303.8041687011718, -13.04211139678955),
		new JSM.Coord2D (305.53958129882807, -14.345172882080078),
		new JSM.Coord2D (307.05151367187494, -15.901714324951172),
		new JSM.Coord2D (308.2914733886718, -17.682279586791992),
		new JSM.Coord2D (309.2132263183593, -19.646312713623047),
		new JSM.Coord2D (309.77932739257807, -21.740589141845703),
		new JSM.Coord2D (309.96874999999994, -23.90178680419922),
		new JSM.Coord2D (309.96874999999994, -45.46428680419922),
		new JSM.Coord2D (309.77932739257807, -47.625484466552734),
		new JSM.Coord2D (309.21340942382807, -49.71982192993164),
		new JSM.Coord2D (308.2914733886718, -51.683753967285156),
		new JSM.Coord2D (307.0514831542968, -53.464298248291016),
		new JSM.Coord2D (305.53958129882807, -55.02088928222656),
		new JSM.Coord2D (303.80419921874994, -56.32395935058594),
		new JSM.Coord2D (301.8931274414062, -57.3525505065918),
		new JSM.Coord2D (299.85278320312494, -58.092491149902344),
		new JSM.Coord2D (297.7281188964843, -58.53616714477539),
		new JSM.Coord2D (295.56249999999994, -58.68303680419922),
		new JSM.Coord2D (107.71874999999999, -58.68303680419922),
		new JSM.Coord2D (105.55313873291014, -58.536163330078125),
		new JSM.Coord2D (103.42848205566405, -58.09251022338867),
		new JSM.Coord2D (101.3881378173828, -57.352508544921875),
		new JSM.Coord2D (99.47705078124999, -56.32398223876953),
		new JSM.Coord2D (97.74167633056639, -55.020896911621094),
		new JSM.Coord2D (96.22973632812499, -53.46435546875),
		new JSM.Coord2D (94.98975372314452, -51.68381118774414),
		new JSM.Coord2D (94.06801605224608, -49.71977615356445),
		new JSM.Coord2D (93.50196075439452, -47.625484466552734),
		new JSM.Coord2D (93.31249999999999, -45.46428680419922),
		new JSM.Coord2D (93.31249999999999, -23.90178680419922),
		new JSM.Coord2D (93.50192260742186, -21.740585327148438),
		new JSM.Coord2D (94.0679473876953, -19.646278381347656),
		new JSM.Coord2D (94.98979187011717, -17.682294845581055),
		new JSM.Coord2D (96.22973632812499, -15.901721954345703),
		new JSM.Coord2D (97.7416534423828, -14.345148086547852),
		new JSM.Coord2D (99.47707366943358, -13.04212474822998),
		new JSM.Coord2D (101.38810729980467, -12.01349925994873),
		new JSM.Coord2D (103.42847442626952, -11.27356243133545),
		new JSM.Coord2D (105.55313873291014, -10.829910278320312)
	];
	test.Assert (TestTriangulation (basePolygon, [0, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
		75, 76, 77, 78, 79, 80, 81, 82, 83, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 199, 200,
		201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102,
		103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 45, 0, 1, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135,
		136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
		171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 122, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
		12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]));

	var basePolygon = [
		new JSM.Coord2D (0.0, 0.0),
		new JSM.Coord2D (300.0, 0.0),
		new JSM.Coord2D (300.0, 300.0),
		new JSM.Coord2D (0.0, 300.0),
		null,
		new JSM.Coord2D (100.0, 100.0),
		new JSM.Coord2D (100.0, 200.0),
		new JSM.Coord2D (200.0, 200.0),
		new JSM.Coord2D (200.0, 100.0),
		null,
		new JSM.Coord2D (10.0, 10.0),
		new JSM.Coord2D (10.0, 50.0),
		new JSM.Coord2D (50.0, 50.0),
		new JSM.Coord2D (50.0, 10.0)
	];
	test.Assert (TestTriangulation (basePolygon, [0, 10, 11, 12, 13, 10, 0, 1, 5, 6, 7, 8, 5, 1, 2, 3]));
	
	var basePolygon = [
		new JSM.Coord2D (0, 0),
		new JSM.Coord2D (7, 0),
		new JSM.Coord2D (7, 3),
		new JSM.Coord2D (0, 3),
		null,
		new JSM.Coord2D (1, 1),
		new JSM.Coord2D (1, 2),
		new JSM.Coord2D (2, 2),
		new JSM.Coord2D (2, 1),
		null,
		new JSM.Coord2D (3, 1),
		new JSM.Coord2D (3, 2),
		new JSM.Coord2D (4, 2),
		new JSM.Coord2D (4, 1),
		null,
		new JSM.Coord2D (5, 1),
		new JSM.Coord2D (5, 2),
		new JSM.Coord2D (6, 2),
		new JSM.Coord2D (6, 1)
	];
	test.Assert (TestTriangulation (basePolygon, [0, 5, 6, 7, 10, 11, 12, 15, 16, 17, 18, 15, 12, 13, 10, 7, 8, 5, 0, 1, 2, 3]));

	var basePolygon = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (10.0, 0.0, 0.0),
		new JSM.Coord (10.0, 10.0, 0.0),
		new JSM.Coord (0.0, 10.0, 0.0),
		null,
		new JSM.Coord (5.0, 5.0, 0.0),
		new JSM.Coord (5.0, 6.0, 0.0),
		new JSM.Coord (6.0, 6.0, 0.0),
		new JSM.Coord (6.0, 5.0, 0.0),
		null,
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (1.0, 9.0, 0.0),
		new JSM.Coord (2.0, 9.0, 0.0),
		new JSM.Coord (2.0, 2.0, 0.0),
		new JSM.Coord (8.0, 2.0, 0.0),
		new JSM.Coord (8.0, 9.0, 0.0),
		new JSM.Coord (9.0, 9.0, 0.0),
		new JSM.Coord (9.0, 1.0, 0.0)
	];
	test.Assert (TestTriangulation (basePolygon, [0, 10, 11, 12, 5, 6, 7, 8, 5, 12, 13, 14, 15, 16, 17, 10, 0, 1, 2, 3]));
	
	var basePolygon = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (10.0, 0.0, 0.0),
		new JSM.Coord (10.0, 10.0, 0.0),
		new JSM.Coord (0.0, 10.0, 0.0),
		null,
		new JSM.Coord (5.0, 5.0, 0.0),
		new JSM.Coord (5.0, 6.0, 0.0),
		new JSM.Coord (6.0, 6.0, 0.0),
		new JSM.Coord (6.0, 5.0, 0.0),
		null,
		new JSM.Coord (3.0, 3.0, 0.0),
		new JSM.Coord (3.0, 4.0, 0.0),
		new JSM.Coord (4.0, 4.0, 0.0),
		new JSM.Coord (4.0, 3.0, 0.0),
		null,
		new JSM.Coord (5.0, 3.0, 0.0),
		new JSM.Coord (5.0, 4.0, 0.0),
		new JSM.Coord (6.0, 4.0, 0.0),
		new JSM.Coord (6.0, 3.0, 0.0),
		null,
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (1.0, 9.0, 0.0),
		new JSM.Coord (2.0, 9.0, 0.0),
		new JSM.Coord (2.0, 2.0, 0.0),
		new JSM.Coord (8.0, 2.0, 0.0),
		new JSM.Coord (8.0, 9.0, 0.0),
		new JSM.Coord (9.0, 9.0, 0.0),
		new JSM.Coord (9.0, 1.0, 0.0)
	];
	test.Assert (TestTriangulation (basePolygon, [0, 20, 21, 22, 5, 6, 7, 8, 11, 12, 15, 16, 17, 18, 15, 12, 13, 10, 11, 8, 5, 22, 23, 24, 25, 26, 27, 20, 0, 1, 2, 3]));
	
	var basePolygon = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (10.0, 0.0, 0.0),
		new JSM.Coord (10.0, 10.0, 0.0),
		new JSM.Coord (0.0, 10.0, 0.0),
		null,
		new JSM.Coord (5.0, 5.0, 0.0),
		new JSM.Coord (5.0, 6.0, 0.0),
		new JSM.Coord (6.0, 6.0, 0.0),
		new JSM.Coord (6.0, 5.0, 0.0),
		null,
		new JSM.Coord (5.0, 3.0, 0.0),
		new JSM.Coord (5.0, 4.0, 0.0),
		new JSM.Coord (6.0, 4.0, 0.0),
		new JSM.Coord (6.0, 3.0, 0.0),
		null,
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (1.0, 9.0, 0.0),
		new JSM.Coord (2.0, 9.0, 0.0),
		new JSM.Coord (2.0, 2.0, 0.0),
		new JSM.Coord (8.0, 2.0, 0.0),
		new JSM.Coord (8.0, 9.0, 0.0),
		new JSM.Coord (9.0, 9.0, 0.0),
		new JSM.Coord (9.0, 1.0, 0.0),
		null,
		new JSM.Coord (3.0, 3.0, 0.0),
		new JSM.Coord (3.0, 4.0, 0.0),
		new JSM.Coord (4.0, 4.0, 0.0),
		new JSM.Coord (4.0, 3.0, 0.0),
	];
	test.Assert (TestTriangulation (basePolygon, [0, 15, 16, 17, 24, 25, 5, 6, 7, 8, 11, 12, 13, 10, 11, 8, 5, 25, 26, 27, 24, 17, 18, 19, 20, 21, 22, 15, 0, 1, 2, 3]));
});

polygonSuite.AddTest ('OldCutPolygonTest', function (test)
{
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0.0, 0.0, 0.0);
	polygon.AddVertex (1.0, 0.0, 0.0);
	polygon.AddVertex (1.0, 1.0, 0.0);
	polygon.AddVertex (0.0, 1.0, 0.0);
	
	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (2.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 0);
	test.Assert (frontPolygons.length == 1);

	test.Assert (
		frontPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (0.0, 0.0, 0.0)) &&
		frontPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (1.0, 0.0, 0.0)) &&
		frontPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (1.0, 1.0, 0.0)) &&
		frontPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (0.0, 1.0, 0.0))
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (-1.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));

	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 0);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.5, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);
	
	test.Assert (
		frontPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (0.5, 0.0, 0.0)) &&
		frontPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (0.5, 1.0, 0.0)) &&
		frontPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (0.0, 1.0, 0.0)) &&
		frontPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (0.0, 0.0, 0.0))
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.5, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);

	test.Assert (
		frontPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (0.5, 1.0, 0.0)) &&
		frontPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (0.5, 0.0, 0.0)) &&
		frontPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (1.0, 0.0, 0.0)) &&
		frontPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (1.0, 1.0, 0.0))
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.8, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);

	test.Assert (
		frontPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (0.8, 0.0, 0.0)) &&
		frontPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (0.8, 1.0, 0.0)) &&
		frontPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (0.0, 1.0, 0.0)) &&
		frontPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (0.0, 0.0, 0.0))
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 0);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (-1.0, 1.0, 0.0));
	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);

	test.Assert (backPolygons[0].VertexCount () == 3);
	test.Assert (frontPolygons[0].VertexCount () == 3);
	test.Assert (
		frontPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (0.0, 0.0, 0.0)) &&
		frontPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (1.0, 1.0, 0.0)) &&
		frontPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (0.0, 1.0, 0.0))
		);
	test.Assert (
		backPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (1.0, 1.0, 0.0)) &&
		backPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (0.0, 0.0, 0.0)) &&
		backPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (1.0, 0.0, 0.0))
		);
	
	polygon = new JSM.Polygon ();
	polygon.AddVertex (-1.0, -1.0, 0.0);
	polygon.AddVertex (-1.0, 1.0, 0.0);
	polygon.AddVertex (1.0, 1.0, 0.0);
	polygon.AddVertex (1.0, -1.0, 0.0);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);

	test.Assert (
		frontPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (0.0, 1.0, 0.0)) &&
		frontPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (0.0, -1.0, 0.0)) &&
		frontPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (-1.0, -1.0, 0.0)) &&
		frontPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (-1.0, 1.0, 0.0))
		);
	test.Assert (
		backPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (0.0, -1.0, 0.0)) &&
		backPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (0.0, 1.0, 0.0)) &&
		backPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (1.0, 1.0, 0.0)) &&
		backPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (1.0, -1.0, 0.0))
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);
	
	test.Assert (
		frontPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (0.0, -1.0, 0.0)) &&
		frontPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (0.0, 1.0, 0.0)) &&
		frontPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (1.0, 1.0, 0.0)) &&
		frontPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (1.0, -1.0, 0.0))
		);
	test.Assert (
		backPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (0.0, 1.0, 0.0)) &&
		backPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (0.0, -1.0, 0.0)) &&
		backPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (-1.0, -1.0, 0.0)) &&
		backPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (-1.0, 1.0, 0.0))
		);

	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0.0, 0.0, 0.0);
	polygon.AddVertex (2.0, 0.0, 0.0);
	polygon.AddVertex (2.0, 1.0, 0.0);
	polygon.AddVertex (1.0, 1.0, 0.0);
	polygon.AddVertex (1.0, 2.0, 0.0);
	polygon.AddVertex (2.0, 2.0, 0.0);
	polygon.AddVertex (2.0, 3.0, 0.0);
	polygon.AddVertex (0.0, 3.0, 0.0);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (3.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 0);
	test.Assert (frontPolygons.length == 1);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (1.5, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 2);
	test.Assert (frontPolygons.length == 1);

	test.Assert (frontPolygons[0].VertexCount () == 8);
	test.Assert (
		frontPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (1.5, 0.0, 0.0)) &&
		frontPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (1.5, 1.0, 0.0)) &&
		frontPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (1.0, 1.0, 0.0)) &&
		frontPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (1.0, 2.0, 0.0)) &&
		frontPolygons[0].GetVertex (4).IsEqual (new JSM.Vector (1.5, 2.0, 0.0)) &&
		frontPolygons[0].GetVertex (5).IsEqual (new JSM.Vector (1.5, 3.0, 0.0)) &&
		frontPolygons[0].GetVertex (6).IsEqual (new JSM.Vector (0.0, 3.0, 0.0)) &&
		frontPolygons[0].GetVertex (7).IsEqual (new JSM.Vector (0.0, 0.0, 0.0))
		);

	test.Assert (backPolygons[0].VertexCount () == 4);
	test.Assert (
		backPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (1.5, 3.0, 0.0)) &&
		backPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (1.5, 2.0, 0.0)) &&
		backPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (2.0, 2.0, 0.0)) &&
		backPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (2.0, 3.0, 0.0))
		);

	test.Assert (backPolygons[1].VertexCount () == 4);
	test.Assert (
		backPolygons[1].GetVertex (0).IsEqual (new JSM.Vector (1.5, 1.0, 0.0)) &&
		backPolygons[1].GetVertex (1).IsEqual (new JSM.Vector (1.5, 0.0, 0.0)) &&
		backPolygons[1].GetVertex (2).IsEqual (new JSM.Vector (2.0, 0.0, 0.0)) &&
		backPolygons[1].GetVertex (3).IsEqual (new JSM.Vector (2.0, 1.0, 0.0))
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.5, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);
	
	test.Assert (frontPolygons[0].VertexCount () == 4);
	test.Assert (
		frontPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (0.5, 0.0, 0.0)) &&
		frontPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (0.5, 3.0, 0.0)) &&
		frontPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (0.0, 3.0, 0.0)) &&
		frontPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (0.0, 0.0, 0.0))
		);

	test.Assert (backPolygons[0].VertexCount () == 8);
	test.Assert (
		backPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (0.5, 3.0, 0.0)) &&
		backPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (0.5, 0.0, 0.0)) &&
		backPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (2.0, 0.0, 0.0)) &&
		backPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (2.0, 1.0, 0.0)) &&
		backPolygons[0].GetVertex (4).IsEqual (new JSM.Vector (1.0, 1.0, 0.0)) &&
		backPolygons[0].GetVertex (5).IsEqual (new JSM.Vector (1.0, 2.0, 0.0)) &&
		backPolygons[0].GetVertex (6).IsEqual (new JSM.Vector (2.0, 2.0, 0.0)) &&
		backPolygons[0].GetVertex (7).IsEqual (new JSM.Vector (2.0, 3.0, 0.0))
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (1.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (1.5, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	backPolygons = [];
	frontPolygons = [];
	result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 2);

	test.Assert (frontPolygons[0].VertexCount () == 4);
	test.Assert (
		frontPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (1.5, 3.0, 0.0)) &&
		frontPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (1.5, 2.0, 0.0)) &&
		frontPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (2.0, 2.0, 0.0)) &&
		frontPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (2.0, 3.0, 0.0))
		);

	test.Assert (frontPolygons[1].VertexCount () == 4);
	test.Assert (
		frontPolygons[1].GetVertex (0).IsEqual (new JSM.Vector (1.5, 1.0, 0.0)) &&
		frontPolygons[1].GetVertex (1).IsEqual (new JSM.Vector (1.5, 0.0, 0.0)) &&
		frontPolygons[1].GetVertex (2).IsEqual (new JSM.Vector (2.0, 0.0, 0.0)) &&
		frontPolygons[1].GetVertex (3).IsEqual (new JSM.Vector (2.0, 1.0, 0.0))
		);

	test.Assert (backPolygons[0].VertexCount () == 8);
	test.Assert (
		backPolygons[0].GetVertex (0).IsEqual (new JSM.Vector (1.5, 0.0, 0.0)) &&
		backPolygons[0].GetVertex (1).IsEqual (new JSM.Vector (1.5, 1.0, 0.0)) &&
		backPolygons[0].GetVertex (2).IsEqual (new JSM.Vector (1.0, 1.0, 0.0)) &&
		backPolygons[0].GetVertex (3).IsEqual (new JSM.Vector (1.0, 2.0, 0.0)) &&
		backPolygons[0].GetVertex (4).IsEqual (new JSM.Vector (1.5, 2.0, 0.0)) &&
		backPolygons[0].GetVertex (5).IsEqual (new JSM.Vector (1.5, 3.0, 0.0)) &&
		backPolygons[0].GetVertex (6).IsEqual (new JSM.Vector (0.0, 3.0, 0.0)) &&
		backPolygons[0].GetVertex (7).IsEqual (new JSM.Vector (0.0, 0.0, 0.0))
		);
});

polygonSuite.AddTest ('CutPolygonTest', function (test)
{
	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (2.0, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	var revPlane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (2.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));

	// two cut polygons in both sides
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0, 0, 0);
	polygon.AddVertex (3, 0, 0);
	polygon.AddVertex (3, 1, 0);
	polygon.AddVertex (1, 1, 0);
	polygon.AddVertex (1, 2, 0);
	polygon.AddVertex (4, 2, 0);
	polygon.AddVertex (4, 5, 0);
	polygon.AddVertex (0, 5, 0);
	polygon.AddVertex (0, 4, 0);
	polygon.AddVertex (3, 4, 0);
	polygon.AddVertex (3, 3, 0);
	polygon.AddVertex (0, 3, 0);

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 2);
	test.Assert (frontPolygons.length == 2);

	test.Assert (backPolygons[0].VertexCount () == 8);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 1, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (1, 1, 0)));
	test.Assert (backPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (1, 2, 0)));
	test.Assert (backPolygons[0].GetVertex (4).IsEqual (new JSM.Coord (2, 2, 0)));
	test.Assert (backPolygons[0].GetVertex (5).IsEqual (new JSM.Coord (2, 3, 0)));
	test.Assert (backPolygons[0].GetVertex (6).IsEqual (new JSM.Coord (0, 3, 0)));
	test.Assert (backPolygons[0].GetVertex (7).IsEqual (new JSM.Coord (0, 0, 0)));

	test.Assert (backPolygons[1].VertexCount () == 4);
	test.Assert (backPolygons[1].GetVertex (0).IsEqual (new JSM.Coord (2, 4, 0)));
	test.Assert (backPolygons[1].GetVertex (1).IsEqual (new JSM.Coord (2, 5, 0)));
	test.Assert (backPolygons[1].GetVertex (2).IsEqual (new JSM.Coord (0, 5, 0)));
	test.Assert (backPolygons[1].GetVertex (3).IsEqual (new JSM.Coord (0, 4, 0)));

	test.Assert (frontPolygons[0].VertexCount () == 8);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 5, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 4, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (3, 4, 0)));
	test.Assert (frontPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (3, 3, 0)));
	test.Assert (frontPolygons[0].GetVertex (4).IsEqual (new JSM.Coord (2, 3, 0)));
	test.Assert (frontPolygons[0].GetVertex (5).IsEqual (new JSM.Coord (2, 2, 0)));
	test.Assert (frontPolygons[0].GetVertex (6).IsEqual (new JSM.Coord (4, 2, 0)));
	test.Assert (frontPolygons[0].GetVertex (7).IsEqual (new JSM.Coord (4, 5, 0)));

	test.Assert (frontPolygons[1].VertexCount () == 4);
	test.Assert (frontPolygons[1].GetVertex (0).IsEqual (new JSM.Coord (2, 1, 0)));
	test.Assert (frontPolygons[1].GetVertex (1).IsEqual (new JSM.Coord (2, 0, 0)));
	test.Assert (frontPolygons[1].GetVertex (2).IsEqual (new JSM.Coord (3, 0, 0)));
	test.Assert (frontPolygons[1].GetVertex (3).IsEqual (new JSM.Coord (3, 1, 0)));

	// same with reversed plane
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, revPlane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 2);
	test.Assert (frontPolygons.length == 2);

	test.Assert (frontPolygons[0].VertexCount () == 8);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (1, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (1, 2, 0)));
	test.Assert (frontPolygons[0].GetVertex (4).IsEqual (new JSM.Coord (2, 2, 0)));
	test.Assert (frontPolygons[0].GetVertex (5).IsEqual (new JSM.Coord (2, 3, 0)));
	test.Assert (frontPolygons[0].GetVertex (6).IsEqual (new JSM.Coord (0, 3, 0)));
	test.Assert (frontPolygons[0].GetVertex (7).IsEqual (new JSM.Coord (0, 0, 0)));

	test.Assert (frontPolygons[1].VertexCount () == 4);
	test.Assert (frontPolygons[1].GetVertex (0).IsEqual (new JSM.Coord (2, 4, 0)));
	test.Assert (frontPolygons[1].GetVertex (1).IsEqual (new JSM.Coord (2, 5, 0)));
	test.Assert (frontPolygons[1].GetVertex (2).IsEqual (new JSM.Coord (0, 5, 0)));
	test.Assert (frontPolygons[1].GetVertex (3).IsEqual (new JSM.Coord (0, 4, 0)));

	test.Assert (backPolygons[0].VertexCount () == 8);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 5, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 4, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (3, 4, 0)));
	test.Assert (backPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (3, 3, 0)));
	test.Assert (backPolygons[0].GetVertex (4).IsEqual (new JSM.Coord (2, 3, 0)));
	test.Assert (backPolygons[0].GetVertex (5).IsEqual (new JSM.Coord (2, 2, 0)));
	test.Assert (backPolygons[0].GetVertex (6).IsEqual (new JSM.Coord (4, 2, 0)));
	test.Assert (backPolygons[0].GetVertex (7).IsEqual (new JSM.Coord (4, 5, 0)));

	test.Assert (backPolygons[1].VertexCount () == 4);
	test.Assert (backPolygons[1].GetVertex (0).IsEqual (new JSM.Coord (2, 1, 0)));
	test.Assert (backPolygons[1].GetVertex (1).IsEqual (new JSM.Coord (2, 0, 0)));
	test.Assert (backPolygons[1].GetVertex (2).IsEqual (new JSM.Coord (3, 0, 0)));
	test.Assert (backPolygons[1].GetVertex (3).IsEqual (new JSM.Coord (3, 1, 0)));

	// all outside
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0, 0, 0);
	polygon.AddVertex (1, 0, 0);
	polygon.AddVertex (1, 1, 0);
	polygon.AddVertex (0, 1, 0);

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 0);	

	test.Assert (backPolygons[0].VertexCount () == 4);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (1, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (1, 1, 0)));
	test.Assert (backPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (0, 1, 0)));

	// all outside, some on the plane
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0, 0, 0);
	polygon.AddVertex (2, 0, 0);
	polygon.AddVertex (2, 2, 0);
	polygon.AddVertex (0, 2, 0);

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 0);	

	test.Assert (backPolygons[0].VertexCount () == 4);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (2, 2, 0)));
	test.Assert (backPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (0, 2, 0)));

	// all inside
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (3, 0, 0);
	polygon.AddVertex (4, 0, 0);
	polygon.AddVertex (4, 1, 0);
	polygon.AddVertex (3, 1, 0);

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 0);
	test.Assert (frontPolygons.length == 1);	

	test.Assert (frontPolygons[0].VertexCount () == 4);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (3, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (4, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (4, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (3, 1, 0)));

	// all inside, some on the plane
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (2, 0, 0);
	polygon.AddVertex (3, 0, 0);
	polygon.AddVertex (3, 1, 0);
	polygon.AddVertex (2, 1, 0);

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 0);
	test.Assert (frontPolygons.length == 1);	

	test.Assert (frontPolygons[0].VertexCount () == 4);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (3, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (3, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (2, 1, 0)));
	
	// both sides, clean cut
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0, 0, 0);
	polygon.AddVertex (3, 0, 0);
	polygon.AddVertex (3, 3, 0);
	polygon.AddVertex (0, 3, 0);

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);	

	test.Assert (backPolygons[0].VertexCount () == 4);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 3, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 3, 0)));
	test.Assert (backPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (0, 0, 0)));

	test.Assert (frontPolygons[0].VertexCount () == 4);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 3, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (3, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (3, 3, 0)));

	// both sides, edge on the plane cut
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0, 0, 0);
	polygon.AddVertex (2, 0, 0);
	polygon.AddVertex (2, 1, 0);
	polygon.AddVertex (3, 1, 0);
	polygon.AddVertex (3, 2, 0);
	polygon.AddVertex (0, 2, 0);

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);	

	test.Assert (backPolygons[0].VertexCount () == 5);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 1, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 2, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 2, 0)));
	test.Assert (backPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (4).IsEqual (new JSM.Coord (2, 0, 0)));
	
	test.Assert (frontPolygons[0].VertexCount () == 4);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 2, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (3, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (3, 2, 0)));

	// both sides, edge on the plane cut
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (2, 0, 0);
	polygon.AddVertex (2, 1, 0);
	polygon.AddVertex (3, 1, 0);
	polygon.AddVertex (3, 2, 0);
	polygon.AddVertex (0, 2, 0);
	polygon.AddVertex (0, 0, 0);

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);	

	test.Assert (backPolygons[0].VertexCount () == 5);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 1, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 2, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 2, 0)));
	test.Assert (backPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (4).IsEqual (new JSM.Coord (2, 0, 0)));

	test.Assert (frontPolygons[0].VertexCount () == 4);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 2, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (3, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (3, 2, 0)));

	// both sides, edge on the plane cut
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (2, 1, 0);
	polygon.AddVertex (3, 1, 0);
	polygon.AddVertex (3, 2, 0);
	polygon.AddVertex (0, 2, 0);
	polygon.AddVertex (0, 0, 0);
	polygon.AddVertex (2, 0, 0);

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);	

	test.Assert (backPolygons[0].VertexCount () == 5);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 1, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 2, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 2, 0)));
	test.Assert (backPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (4).IsEqual (new JSM.Coord (2, 0, 0)));

	test.Assert (frontPolygons[0].VertexCount () == 4);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 2, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (3, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (3, 2, 0)));
	
	// cut triangle
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0, 0, 0);
	polygon.AddVertex (3, 0, 0);
	polygon.AddVertex (0, 2, 0);

	var backPolygons = [];
	var frontPolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);	

	test.Assert (backPolygons[0].VertexCount () == 4);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 0.6666666666666666, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 2, 0)));
	test.Assert (backPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (0, 0, 0)));

	test.Assert (frontPolygons[0].VertexCount () == 3);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (2, 0.6666666666666666, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (2, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (3, 0, 0)));

	// cut triangles from polygon
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0, 0, 0);
	polygon.AddVertex (10, 0, 0);
	polygon.AddVertex (10, 3, 0);
	polygon.AddVertex (9, 1, 0);
	polygon.AddVertex (8, 3, 0);
	polygon.AddVertex (7, 1, 0);
	polygon.AddVertex (6, 3, 0);
	polygon.AddVertex (5, 1, 0);
	polygon.AddVertex (4, 3, 0);
	polygon.AddVertex (3, 1, 0);
	polygon.AddVertex (2, 3, 0);
	polygon.AddVertex (1, 1, 0);
	polygon.AddVertex (0, 3, 0);

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 2.0, 0.0), new JSM.Vector (0.0, 1.0, 0.0));

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 6);	

	test.Assert (backPolygons[0].VertexCount () == 19);
	test.Assert (frontPolygons[0].VertexCount () == 3);
	test.Assert (frontPolygons[1].VertexCount () == 3);
	test.Assert (frontPolygons[2].VertexCount () == 3);
	test.Assert (frontPolygons[3].VertexCount () == 3);
	test.Assert (frontPolygons[4].VertexCount () == 3);
	test.Assert (frontPolygons[5].VertexCount () == 3);

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 2.0, 0.0), new JSM.Vector (0.0, -1.0, 0.0));

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 6);
	test.Assert (frontPolygons.length == 1);	

	test.Assert (frontPolygons[0].VertexCount () == 19);
	test.Assert (backPolygons[0].VertexCount () == 3);
	test.Assert (backPolygons[1].VertexCount () == 3);
	test.Assert (backPolygons[2].VertexCount () == 3);
	test.Assert (backPolygons[3].VertexCount () == 3);
	test.Assert (backPolygons[4].VertexCount () == 3);
	test.Assert (backPolygons[5].VertexCount () == 3);

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 1.0, 0.0), new JSM.Vector (0.0, 1.0, 0.0));

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);

	test.Assert (backPolygons[0].VertexCount () == 4);
	test.Assert (frontPolygons[0].VertexCount () == 13);

	// cut through existing vertices
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0, 0, 0);
	polygon.AddVertex (4, 0, 0);
	polygon.AddVertex (3, 1, 0);
	polygon.AddVertex (4, 2, 0);
	polygon.AddVertex (0, 2, 0);
	polygon.AddVertex (1, 1, 0);

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 1.0, 0.0), new JSM.Vector (0.0, 1.0, 0.0));

	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);

	test.Assert (backPolygons[0].VertexCount () == 4);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (3, 1, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (1, 1, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (4, 0, 0)));

	test.Assert (frontPolygons[0].VertexCount () == 4);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (1, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (3, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (4, 2, 0)));
	test.Assert (frontPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (0, 2, 0)));

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (1.0, 1.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 1.0), new JSM.Vector (0.0, 0.0, 1.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 0);
	test.Assert (backPolygons[0].VertexCount () == 6);

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, -1.0), new JSM.Vector (0.0, 0.0, 1.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 0);
	test.Assert (frontPolygons.length == 1);
	test.Assert (frontPolygons[0].VertexCount () == 6);

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (0.0, 0.0, 1.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 0);
	test.Assert (frontPolygons.length == 0);
	test.Assert (planePolygons.length == 1);
	test.Assert (planePolygons[0].VertexCount () == 6);
});

polygonSuite.AddTest ('CutTriangleTest', function (test)
{
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0, 0, 0);
	polygon.AddVertex (1, 0, 0);
	polygon.AddVertex (0, 1, 0);

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (2.0, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 0);
	test.Assert (backPolygons[0].VertexCount () == 3);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (1, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 1, 0)));

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (2.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 0);
	test.Assert (frontPolygons.length == 1);
	test.Assert (frontPolygons[0].VertexCount () == 3);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (1, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 1, 0)));

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (1.0, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 0);
	test.Assert (backPolygons[0].VertexCount () == 3);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (1, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 1, 0)));

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (1.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 0);
	test.Assert (frontPolygons.length == 1);
	test.Assert (frontPolygons[0].VertexCount () == 3);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (1, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 1, 0)));

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (0.0, -1.0, 0.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 0);
	test.Assert (backPolygons[0].VertexCount () == 3);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (1, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 1, 0)));

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 0);
	test.Assert (frontPolygons.length == 1);
	test.Assert (frontPolygons[0].VertexCount () == 3);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (1, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 1, 0)));

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (0.0, 0.0, 1.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 0);
	test.Assert (frontPolygons.length == 0);
	test.Assert (planePolygons.length == 1);

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (0.0, 0.0, -1.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 0);
	test.Assert (frontPolygons.length == 0);
	test.Assert (planePolygons.length == 1);

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.5, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);
	
	test.Assert (backPolygons[0].VertexCount () == 4);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0.5, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (0.5, 0.5, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 1, 0)));
	test.Assert (backPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (0, 0, 0)));
	
	test.Assert (frontPolygons[0].VertexCount () == 3);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0.5, 0.5, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (0.5, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (1, 0, 0)));

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.5, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);
	
	test.Assert (frontPolygons[0].VertexCount () == 4);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0.5, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (0.5, 0.5, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (0, 0, 0)));
	
	test.Assert (backPolygons[0].VertexCount () == 3);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0.5, 0.5, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (0.5, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (1, 0, 0)));

	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0, 0, 0);
	polygon.AddVertex (1, 0, 0);
	polygon.AddVertex (0.5, 1, 0);
	
	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.5, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);
	
	test.Assert (backPolygons[0].VertexCount () == 3);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0.5, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (0.5, 1, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 0, 0)));

	test.Assert (frontPolygons[0].VertexCount () == 3);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0.5, 1, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (0.5, 0, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (1, 0, 0)));

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.5, 0.0), new JSM.Vector (0.0, 1.0, 0.0));
	var backPolygons = [];
	var frontPolygons = [];
	var planePolygons = [];
	var result = JSM.CutPolygonWithPlane (polygon, plane, frontPolygons, backPolygons, planePolygons);
	test.Assert (result == true);
	test.Assert (backPolygons.length == 1);
	test.Assert (frontPolygons.length == 1);

	test.Assert (backPolygons[0].VertexCount () == 4);
	test.Assert (backPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0.75, 0.5, 0)));
	test.Assert (backPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (0.25, 0.5, 0)));
	test.Assert (backPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0, 0, 0)));
	test.Assert (backPolygons[0].GetVertex (3).IsEqual (new JSM.Coord (1, 0, 0)));

	test.Assert (frontPolygons[0].VertexCount () == 3);
	test.Assert (frontPolygons[0].GetVertex (0).IsEqual (new JSM.Coord (0.25, 0.5, 0)));
	test.Assert (frontPolygons[0].GetVertex (1).IsEqual (new JSM.Coord (0.75, 0.5, 0)));
	test.Assert (frontPolygons[0].GetVertex (2).IsEqual (new JSM.Coord (0.5, 1, 0)));
});

polygonSuite.AddTest ('BSPTreeTest', function (test)
{
	function TestNode (test, node, vertexCount, normalVector)
	{
		test.Assert (node.polygon.VertexCount () == vertexCount);
		test.Assert (node.plane.GetNormal ().IsEqual (normalVector));
	}

	var bspTree = new JSM.BSPTree ();
	
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (-1, 0, -1);
	polygon.AddVertex (1, 0, -1);
	polygon.AddVertex (1, 0, 1);
	polygon.AddVertex (-1, 0, 1);
	bspTree.AddPolygon (polygon, 0);
	test.Assert (bspTree.NodeCount () == 1);
	
	TestNode (test, bspTree.root, 4, new JSM.Coord (0, -1, 0));
	test.Assert (bspTree.root.userData == 0);
	test.Assert (bspTree.root.inside == null);
	test.Assert (bspTree.root.outside == null);
	
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0, -1, -1);
	polygon.AddVertex (0, 1, -1);
	polygon.AddVertex (0, 1, 1);
	polygon.AddVertex (0, -1, 1);
	bspTree.AddPolygon (polygon, 1);
	test.Assert (bspTree.NodeCount () == 3);

	TestNode (test, bspTree.root, 4, new JSM.Coord (0, -1, 0));
	test.Assert (bspTree.root.inside != null);
	test.Assert (bspTree.root.outside != null);
	TestNode (test, bspTree.root.inside, 4, new JSM.Coord (1, 0, 0));
	test.Assert (bspTree.root.inside.userData == 1);
	TestNode (test, bspTree.root.outside, 4, new JSM.Coord (1, 0, 0));
	test.Assert (bspTree.root.outside.userData == 1);

	var polygon = new JSM.Polygon ();
	polygon.AddVertex (-1, -1, 0);
	polygon.AddVertex (1, -1, 0);
	polygon.AddVertex (1, 1, 0);
	polygon.AddVertex (-1, 1, 0);
	bspTree.AddPolygon (polygon, 2);
	test.Assert (bspTree.NodeCount () == 7);

	TestNode (test, bspTree.root, 4, new JSM.Coord (0, -1, 0));
	test.Assert (bspTree.root.inside != null);
	test.Assert (bspTree.root.outside != null);
	TestNode (test, bspTree.root.inside, 4, new JSM.Coord (1, 0, 0));
	TestNode (test, bspTree.root.outside, 4, new JSM.Coord (1, 0, 0));
	
	test.Assert (bspTree.root.inside.inside != null);
	test.Assert (bspTree.root.inside.outside != null);
	TestNode (test, bspTree.root.inside.inside, 4, new JSM.Coord (0, 0, 1));
	test.Assert (bspTree.root.inside.inside.userData == 2);
	TestNode (test, bspTree.root.inside.outside, 4, new JSM.Coord (0, 0, 1));
	test.Assert (bspTree.root.inside.outside.userData == 2);
	
	test.Assert (bspTree.root.outside.inside != null);
	test.Assert (bspTree.root.outside.outside != null);
	TestNode (test, bspTree.root.outside.inside, 4, new JSM.Coord (0, 0, 1));
	test.Assert (bspTree.root.outside.inside.userData == 2);
	TestNode (test, bspTree.root.outside.outside, 4, new JSM.Coord (0, 0, 1));
	test.Assert (bspTree.root.outside.outside.userData == 2);
});

}
