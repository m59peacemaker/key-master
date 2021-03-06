function basicObjectMap() {
	var obj = Object.create(null)
	return {
		get: function(key) { return obj[key] },
		set: function(key, value) { return obj[key] = value },
		has: function(key) { return obj[key] !== undefined },
		delete: function(key) { return delete obj[key] }
	}
}

module.exports = function(factory, map) {
	map = map || basicObjectMap()

	function has(key) {
		return map.has(key)
	}

	function get(key) {
		if (!map.has(key) && typeof factory === 'function') {
			map.set(key, factory(key))
		}

		return map.get(key)
	}

	function remove(key) {
		return map.delete(key)
	}

	function set(key, value) {
		return map.set(key, value)
	}

	return {
    has: has,
		get: get,
		remove: remove,
		delete: remove,
		unset: remove,
		set: set,
		put: set,
		add: set
	}
}
