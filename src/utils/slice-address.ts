export function sliceAddress(address: string): string {
  return address.slice(0, 6) + '...' + address.slice(-6);
}
