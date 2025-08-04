import { ProductLeaf } from 'apps/commerce/types.ts'
import { signal } from '@preact/signals'
import { useOffer } from "$store/sdk/useOffer.ts";

type Possibilities = Record<string, Variant[]>
export type Variant = {
	/**
	 * @description O nome da propriedade
	 * @example cor, tamanho, etc...
	 */
	name: string
	/**
	 * @description O valor da propriedade
	 * @example azul, verde, etc...
	 */
	value: string
	product: {
		name: string
		price: number
		discount: number
		productGroupID: string
		productID: string
		url: string
		seller: string
		quantity: number
		trackingId?: string
	}
}

const omit = new Set(['category', 'cluster', 'RefId', 'Tamanho'])
export const inactiveProduct = signal<number | null>(null)
export const selectedProducts = signal<(Variant | undefined)[]>([])

export const useVariants = (
	variants: ProductLeaf[],
): Variant[] => {
	const possibilities: Possibilities = {}

	for (const variant of variants) {
		// if (
		// 	!variant.offers ||
		// 	variant.offers.offers[0].availability !== 'https://schema.org/InStock'
		// ) {
		// 	console.log('not in stock')
		// 	continue
		// }
		const properties = variant.additionalProperty?.filter(({ name }) => name && !omit.has(name))
		if (!properties) {
			continue
		}

		const trackingId = variant.additionalProperty?.find((p) => p.name === 'trackingId')
			?.value

		for (let it = 0; it < properties.length; it++) {
			const name = properties[it].name?.toLowerCase()
			const value = properties[it].value?.toLowerCase()

			if (!name || !value) {
				continue
			}
			if (omit.has(name)) {
				// console.log('omit')
				continue
			}

			if (!possibilities[name]) {
				possibilities[name] = []
			}

			const {
				price = 0,
				listPrice = 0,
				seller = '1',
			} = useOffer(variant.offers)

			possibilities[name].push({
				name,
				value,
				product: {
					name: variant.name ?? '',
					price,
					discount: price > 0 && listPrice > 0 ? listPrice - price : 0,
					productGroupID: variant.inProductGroupWithID ?? '',
					productID: variant.productID,
					url: variant.url ?? '',
					seller,
					quantity: 1,
					trackingId,
				},
			})
		}
	}

	return 'tamanhos' in possibilities && possibilities['tamanhos'].length > 0
		? possibilities['tamanhos']
		: 'cor' in possibilities && possibilities['cor'].length > 0
		? possibilities['cor']
		: []
}
