export class Promo {
  promoId: number | undefined;
  promoName: string;

  constructor(promoName: string, promoId?: number) {
    this.promoName = promoName;
    this.promoId = promoId;
  }

  static fromJson(json: any): Promo {
    return new Promo(json.promoName, json.promoId);
  }

  static initializePromos(jsonPromos: Promo[]): Promo[] {
    let promos: Promo[] = [];
    if(jsonPromos != undefined) {
      for(let jsonPromo of jsonPromos) {
        promos.push(Promo.fromJson(jsonPromo));
      }
    }
    return promos;
  }
}
