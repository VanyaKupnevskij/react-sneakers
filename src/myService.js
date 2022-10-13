export function priceToString(price) {
    return Math.trunc(price / 1000) + " " + (price % 1000);
}
