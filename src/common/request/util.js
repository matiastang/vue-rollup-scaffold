import objectHash from "../node_modules/object-hash"

/**
 * 获取对象的hash值
 * @param {Object} obj hash对象
 * @return {String} hash值
 */
function getObjectHash(obj) {
	/**
	 * 默认方式,包括了键值对
	 */
	return objectHash(obj)
}

export {
	getObjectHash,
}