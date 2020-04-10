const arraysEqual = <T>(arr: T[], arr1: T[]) : boolean => {
	if (arr.length !== arr1.length) return false

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] !== arr1[i]) return false
	}

	return true
}
export default arraysEqual
