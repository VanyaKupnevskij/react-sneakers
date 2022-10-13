export function priceToString(price) {
    const tens = Math.trunc(price / 1000);
    const ones = (price % 1000) + "";
    return ( (tens > 0 ? tens + " " : "") + 
        (tens > 0 ? ones.padStart(ones.indexOf('.') == -1 ? 3 : 6, "0") : ones));
}
