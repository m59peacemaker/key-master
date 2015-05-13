var test = require('tape')
var KeyMaster = require('./')

test('set and get', function(t) {
	var map = new KeyMaster(function() {
		t.fail('No need for the constructor function')
	})

	map.set('key1', 1)
	map.set('key2', 2)
	t.equal(map.get('key1'), 1)
	t.end()
})

test('constructor and get', function(t) {
	var constructorCreatedObjects = []

	var map = new KeyMaster(function() {
		var o = {}
		constructorCreatedObjects.push(o)
		return o
	})

	t.equal(map.get('key1'), constructorCreatedObjects[0])
	t.equal(map.get('key2'), constructorCreatedObjects[1])
	t.equal(map.get('key1'), constructorCreatedObjects[0])
	t.end()
})

test('deleting', function(t) {
	var constructorCreatedObjects = []

	var map = new KeyMaster(function() {
		var o = {}
		constructorCreatedObjects.push(o)
		return o
	})

	t.equal(map.get('key1'), constructorCreatedObjects[0])
	t.equal(map.get('key2'), constructorCreatedObjects[1])
	t.equal(map.get('key1'), constructorCreatedObjects[0])
	map.remove('key1')
	t.equal(map.get('key2'), constructorCreatedObjects[1])
	t.equal(map.get('key1'), constructorCreatedObjects[2])

	t.end()
})

test('friendly names', function(t) {
	var map = new KeyMaster(function() {})

	t.equal(map.put, map.set)
	t.equal(map.put, map.add)

	t.equal(map.delete, map.remove)
	t.equal(map.delete, map.unset)
	t.end()
})

test('no constructor', function (t) {
	var map = new KeyMaster()
	
	map.set('key1', 3)
	map.set('key1')
	map.set('key2')
	
	t.equal(map.get('key1'), undefined)
	t.equal(map.get('key2'), undefined)
	t.end()
})

test('set and delete return', function (t) {
	var map = new KeyMaster()
	
	t.equal(map.set('key1', 3), 3)
	t.equal(map.set('key2'), undefined)
	t.ok(map.remove('key1'))
	t.notOk(map.remove('key1'))
	t.end()
})

test('constructor called with "new"', function (t) {
	var map = new KeyMaster(CalledWithNew)
	
	function CalledWithNew() {
		var window = window || global
		return !(this === window)
	}
	t.notOk(CalledWithNew())
	t.ok(new CalledWithNew())
	
	t.ok(map.get('key1'))
	t.end()
})
