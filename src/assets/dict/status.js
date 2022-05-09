export const paymentStatus = [
  { label: 'Payment success', value: 0 },
  { label: 'Payment failure', value: 1 },
  { label: 'Order failure', value: 2 },
  { label: 'Pickup failure', value: 3 },
  { label: 'Refund application', value: 4 },
]
export const ratingStatus = [
  { label: 'Closed', value: '01' },
  { label: 'In Progress', value: '02' },
  { label: 'Unprocessed', value: '03' },
]

const BannerStatus = {
  Init: 0,
  Saved: 1,
  Published: 2
}
Object.freeze(BannerStatus)
export { BannerStatus }