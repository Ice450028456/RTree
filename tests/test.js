mocha.setup({
	ui: "bdd",
	globals: ["console"],
	timeout: 30000
});

var assert = chai.assert;

describe('RTree', function () {
	var rt = new RTree();
	describe('RTree Creation', function () {
		it('Insert 1k Objects',function() {
		var i = 1000;
				while(i > 0) {
					var bounds = {x:(Math.random()*10000), y:(Math.random()*10000), w:(0), h:(0)};
					rt.insert(bounds, "JUST A TEST OBJECT!_"+i);
					i--;
				}
			var rslt = rt.search({x:0,y:0,w:10600,h:10600});
			assert.equal(rslt.length,1000);
		});
		it('Insert 1k more Objects',function() {
		var i = 2000;
				while(i > 1000) {
					var bounds = {x:(Math.random()*10000), y:(Math.random()*10000), w:(Math.random()*500), h:(Math.random()*500)};
					rt.insert(bounds, "JUST A TEST OBJECT!_"+i);
					i--;
				}
			assert.equal(rt.search({x:0,y:0,w:10600,h:10600}).length,2000);
		});
	});
	describe('RTree Searching', function () {
		it('1k Out-of-Bounds Searches', function() {
			var i = 1000;
			var len = 0;
			while(i > 0) {
				var bounds = {x:-(Math.random()*10000+501), y:-(Math.random()*10000+501), w:(Math.random()*500), h:(Math.random()*500)};
				len += rt.search(bounds).length;
				i--;
			}
			assert.equal(len,0);
		});
		it('1k In-Bounds Searches', function() {
			var i = 1000;
			var len = 0;
			while(i > 0) {
				var bounds = {x:(Math.random()*10000), y:(Math.random()*10000), w:(Math.random()*500), h:(Math.random()*500)};
				len += rt.search(bounds).length;
				i--;
			}
			assert.notEqual(len,0);
		});
	});
	describe('RTree Deletion', function(){
		var g_len = 0;
		var t = rt.getTree();
		console.log([t.x,t.y,t.w,t.h]);
		it('Delete Half the RTree', function() {
			var bounds = {x:0,y:0,w:10600,h:10600};
			g_len += rt.remove(bounds).length;
			assert.notEqual(g_len,0);
		});
		t = rt.getTree();
		console.log([t.x,t.y,t.w,t.h]);
		it('Delete the Other Half of the RTree', function() {
			var bounds = {x:0,y:0,w:10600,h:10600};
			g_len += rt.remove(bounds).length;
			assert.equal(g_len,2000);
		});
	});
	describe('GeoJSON', function(){
		var gTree;
		var geoJson={"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[100,1]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"LineString","coordinates":[[100,0],[101,1]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiPoint","coordinates":[[100,0],[101,1]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiLineString","coordinates":[[[100,0],[101,1]],[[102,2],[103,3]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[102,2],[103,2],[103,3],[102,3],[102,2]]],[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[100,0]},{"type":"LineString","coordinates":[[101,0],[102,1]]},{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]},{"type":"MultiPoint","coordinates":[[100,0],[101,1]]},{"type":"MultiLineString","coordinates":[[[100,0],[101,1]],[[102,2],[103,3]]]},{"type":"MultiPolygon","coordinates":[[[[102,2],[103,2],[103,3],[102,3],[102,2]]],[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]]},{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[100,1]},{"type":"LineString","coordinates":[[102,0],[103,1]]}]}]},"properties":{"prop0":"value0"}}]};
		var geoJsonCopy={"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[100,1]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"LineString","coordinates":[[100,0],[101,1]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiPoint","coordinates":[[100,0],[101,1]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiLineString","coordinates":[[[100,0],[101,1]],[[102,2],[103,3]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[102,2],[103,2],[103,3],[102,3],[102,2]]],[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[100,0]},{"type":"LineString","coordinates":[[101,0],[102,1]]},{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]},{"type":"MultiPoint","coordinates":[[100,0],[101,1]]},{"type":"MultiLineString","coordinates":[[[100,0],[101,1]],[[102,2],[103,3]]]},{"type":"MultiPolygon","coordinates":[[[[102,2],[103,2],[103,3],[102,3],[102,2]]],[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]]},{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[100,1]},{"type":"LineString","coordinates":[[102,0],[103,1]]}]}]},"properties":{"prop0":"value0"}}]};

		it('should be able to use the factory function', function() {
			gTree=rTree();
			assert.instanceOf(gTree,RTree);
		});
		it('should be able to add geojson without modifying the original',function(){
			gTree.geoJSON(geoJson);
			assert.deepEqual(geoJson,geoJsonCopy);
		});
		it('should be able to get geojson',function(){
			var result = gTree.bbox([0,0],[500,500]);
			result.sort(function(a,b){return JSON.stringify(a).length-JSON.stringify(b).length});
			geoJsonCopy.features.sort(function(a,b){return JSON.stringify(a).length-JSON.stringify(b).length});
			assert.deepEqual(result,geoJsonCopy.features);
		});
	});
	describe('async', function(){
		it('should be able to use the factory function', function(done) {
			rTree(function(err,gTree){
				assert.instanceOf(gTree,RTree);
				done();
			});
		});
		it('should be able to use the factory function with a width', function(done) {
			rTree(3,function(err,gTree){
				assert.instanceOf(gTree,RTree);
				done();
			});
		});
		it('should be able to get geojson',function(done){
			var geoJson={"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[100,1]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"LineString","coordinates":[[100,0],[101,1]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiPoint","coordinates":[[100,0],[101,1]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiLineString","coordinates":[[[100,0],[101,1]],[[102,2],[103,3]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[102,2],[103,2],[103,3],[102,3],[102,2]]],[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[100,0]},{"type":"LineString","coordinates":[[101,0],[102,1]]},{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]},{"type":"MultiPoint","coordinates":[[100,0],[101,1]]},{"type":"MultiLineString","coordinates":[[[100,0],[101,1]],[[102,2],[103,3]]]},{"type":"MultiPolygon","coordinates":[[[[102,2],[103,2],[103,3],[102,3],[102,2]]],[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]]},{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[100,1]},{"type":"LineString","coordinates":[[102,0],[103,1]]}]}]},"properties":{"prop0":"value0"}}]};
			rTree(function(err,gTree){
				gTree.geoJSON(geoJson,function(err,success){
					var num = 0;
					var tick = function(){
						if(num === 3){
							done();
						}
					};
					if(success){
						gTree.bbox([99,1],[101,3],function(err,result){
							assert.equal(result.length,3);
							num++;
							tick();
						});
						gTree.bbox([[99,0],[101,2]],function(err,result){
							var geoJsonCopy={"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[100,1]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"LineString","coordinates":[[100,0],[101,1]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiPoint","coordinates":[[100,0],[101,1]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiLineString","coordinates":[[[100,0],[101,1]],[[102,2],[103,3]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[102,2],[103,2],[103,3],[102,3],[102,2]]],[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[100,0]},{"type":"LineString","coordinates":[[101,0],[102,1]]},{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]},{"type":"MultiPoint","coordinates":[[100,0],[101,1]]},{"type":"MultiLineString","coordinates":[[[100,0],[101,1]],[[102,2],[103,3]]]},{"type":"MultiPolygon","coordinates":[[[[102,2],[103,2],[103,3],[102,3],[102,2]]],[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]]},{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[100,1]},{"type":"LineString","coordinates":[[102,0],[103,1]]}]}]},"properties":{"prop0":"value0"}}]};
							result.sort(function(a,b){return JSON.stringify(a).length-JSON.stringify(b).length});
							geoJsonCopy.features.sort(function(a,b){return JSON.stringify(a).length-JSON.stringify(b).length});
							assert.deepEqual(result,geoJsonCopy.features);
							num++;
							tick();
						});
						gTree.bbox(100,2,100,2,function(err,result){
							assert.equal(result.length,2);
							num++;
							tick();
						});
					}	
				});
			});
		});
		it('should be able to delete geojson',function(done){
			var geoJson={"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[100,1]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"LineString","coordinates":[[100,0],[101,1]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiPoint","coordinates":[[100,0],[101,1]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiLineString","coordinates":[[[100,0],[101,1]],[[102,2],[103,3]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[102,2],[103,2],[103,3],[102,3],[102,2]]],[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]]},"properties":{"prop0":"value0"}},{"type":"Feature","geometry":{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[100,0]},{"type":"LineString","coordinates":[[101,0],[102,1]]},{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]},{"type":"MultiPoint","coordinates":[[100,0],[101,1]]},{"type":"MultiLineString","coordinates":[[[100,0],[101,1]],[[102,2],[103,3]]]},{"type":"MultiPolygon","coordinates":[[[[102,2],[103,2],[103,3],[102,3],[102,2]]],[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]]},{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[100,1]},{"type":"LineString","coordinates":[[102,0],[103,1]]}]}]},"properties":{"prop0":"value0"}}]};
			rTree(function(err,gTree){
				gTree.geoJSON(geoJson,function(err,success){
					if(success){
						gTree.remove({x:0,y:0,h:500,w:500},function(err,result){
							assert.equal(result.length,geoJson.features.length);
							done();
						});
					}
				});
			});
		});
	});
});