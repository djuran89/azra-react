console.log("START");
function binary_search(A, n, T) {
	let L = 0;
	let R = n - 1;
	while (L <= R) {
		let m = parseInt((L + R) / 2);
		if (A[m] < T) {
			L = m + 1;
		} else if (A[m] > T) {
			R = m - 1;
		} else {
			return m;
		}
	}
    return "unsuccessful";
}
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const search = binary_search(array, 10, 10);

console.log(search);
