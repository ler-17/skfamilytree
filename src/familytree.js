class person {
    
    constructor(id, name, families) {
        this.id = id;
        this.name = name;
        this.families = families;
        this.parent = null;
        this.children = [];
        this.marriages = [];
    }

    toJSON() {
    return {
        name: this.name,
        families: this.families,
        parent: this.parent ? this.parent.label : null,
        children: this.children.map(c => c.name),
        marriages: this.marriages.map(m => m.label),
        };
    }
    get label() { return this.name; }
}

class marriage {
    constructor(partner1, partner2) {
        this.partners = [partner1, partner2];
        this.children = [];
        partner1.marriages.push(this);
        partner2.marriages.push(this);
    }

    get label() { return this.partners.map(p => p.name).join(' ♥ '); }
    toJSON() {
        return {
            partners: this.partners.map(p => p.name),
            children: this.children.map(c => c.name),
        };
    }
}

const tree = {
    people: new Map(),
    add(id, name, families, parent = null) {
        const p = new person(id, name, families);
        this.people.set(id, p);
        if (parent) {p.parent = parent; parent.children.push(p);}
        return p;
    }, 
    marry(partner1, partner2) {return new marriage(partner1, partner2)},
    addChild(parent, id, name, families) {
        const p = new person(id, name, families);
        p.parent = parent;
        parent.children.push(p);
        this.people.set(id, p);
        return p;
    },
};

// famA
const morganC = tree.add('morganC', 'Morgan C', ['famA']);
const elizaW = tree.addChild(morganC, 'elizaW', 'Eliza W', ['famA']);
const meganH = tree.addChild(elizaW, 'meganH', 'Megan H', ['famA']);
const josephineS = tree.addChild(meganH, 'josephineS', 'Josephine S', ['famA']);
const noveyC = tree.addChild(josephineS, 'noveyC', 'Novey C', ['famA']);
const alexisD = tree.addChild(noveyC, 'alexisD', 'Alexis D', ['famA']);

const katieR = tree.addChild(alexisD, 'katieR', 'Katie R', ['famA']);
const edie = tree.addChild(katieR, 'edie', 'Edie', ['famA']);
const ryanM = tree.addChild(edie, 'ryanM', 'Ryan M', ['famA']);
const savannahW = tree.addChild(edie, 'savannahW, Savannah W', ['famA']);
const angelica = tree.addChild(ryanM, 'angelica', 'Angelica', ['famA']);
const emilyB = tree.addChild(angelica, 'emilyB', 'Emily B', ['famA']);

const sydneyM = tree.addChild(alexisD, "sydneyM", 'Sydney M', ['famA']);
const hannahH = tree.addChild(sydneyM, 'hannahH', 'Hannah H', ['famA']);
const stella = tree.addChild(hannahH, 'stella', 'Stella', ['famA']);
const eileenW = tree.addChild(hannahH, 'eileenW', 'Eileen W', ['famA']);
const jillianB = tree.addChild(stella, 'jillianB', 'Jillian B', ['famA']);
const cheyenne = tree.addChild(eileenW, 'cheyenne', 'Cheyenne', ['famA']);


// la fam 
const chloeM = tree.add('chloeM', "Chloe M", ['la fam']);
const carlyS = tree.addChild(chloeM, 'carlyS', "Carly S", ['la fam']);

const saraC = tree.addChild(carlyS, 'saraC', 'Sara C', ['la fam']);
const meganB = tree.addChild(carlyS, 'meganB', 'Megan B', ['la fam']);

const vivianC = tree.addChild(saraC, 'vivianC', 'Vivian C', ['la fam']);
const cari = tree.addChild(vivianC, 'car', 'Cari', ["la fam"]);
const emily = tree.addChild(cari, 'emily', 'Emily', ['la fam']);
const zoeL = tree.addChild(cari, 'zoeL', 'Zoe L', ['la fam']);

const alyS = tree.addChild(emily, 'alyS', 'Aly S', ['la fam']);
const phoebe = tree.addChild(alyS, 'phoebe', "Phoebe", ['la fam']);

const jennyP = tree.addChild(phoebe, 'jennyP', "Jenny P", ['la fam']);
const oliviaH = tree.addChild(phoebe, 'oliviaH', 'Olivia H', ['la fam']);

const kristinaM = tree.addChild(jennyP, 'kristinaM', "Kristina M", ['la fam']);
const paigeH = tree.addChild(jennyP, 'paigeH', 'Paige H', ['la fam']);

const natalieK = tree.addChild(paigeH, 'natalieK', 'Natalie K', ['la fam']);
const kateS = tree.addChild(natalieK, 'kateS', 'Kate S', ['la fam']);

const brooklynS = tree.addChild(paigeH, 'brooklynS', 'Brooklyn S', ['la fam']);
const ellieA = tree.addChild(brooklynS, 'ellieA', 'Ellie A', ['la fam']);

const sofiaC = tree.addChild(brooklynS, 'sofiaC', 'Sofia C', ['la fam']);

// la fam x fluttercup fam
const lucyB = tree.addChild(oliviaH, 'lucyB', 'Lucy B', ['la fam', 'fluttercup fam']);
const alexaM = tree.addChild(lucyB, 'alexaM', 'Alexa M', ['la fam', 'fluttercup fam']);

const laurenR = tree.addChild(alexaM, 'laurenR', 'Lauren R', ['la fam', 'fluttercup fam']);
const sarahM = tree.addChild(laurenR, 'sarahM', 'Sarah M', ['la fam', 'fluttercup fam']);
const teresaR = tree.addChild(laurenR, 'teresaR', 'Teresa R', ['la fam', 'fluttercup fam']);

// tequila family 
const lindsayG = tree.add('lindsayG', "Lindsay G", ['tequila family'], josephineS);
const emilyC = tree.addChild(lindsayG, 'emilyC', 'Emily C', ['tequila family']);
const meredithC = tree.addChild(emilyC, 'meredithC', 'Meredith C', ['tequila family']);
const caroline = tree.addChild(meredithC, 'caroline', 'Caroline', ['tequila family']);
const allyP = tree.addChild(caroline, 'allyP', 'AllyP', ['tequila family']);
const astridF = tree.addChild(allyP, 'astridF', 'Astrid F', ['tequila family']);
const zoeN = tree.addChild(allyP, 'zoeN', 'Zoe N', ['tequila family']);

// la fam x tequila family 
const mOliviaAstrid = tree.marry(astridF, oliviaH);
const savB = tree.addChild(mOliviaAstrid, 'savB', 'Sav B', ['la fam', 'tequila family']);
const emileeM = tree.addChild(savB, 'emileeM', 'Emilee M', ['la fam', 'tequila fam']);
const carissaV = tree.addChild(emileeM, 'carissaV', 'Carissa V', ['la fam', 'tequila fam']);
const kimia = tree.addChild(carissaV, 'kimia', 'Kimia', ['la fam', 'tequila fam']);

// famB
const zhane = tree.add('zhane', 'Zhane', ['famB']);
const eleanor = tree.addChild(zhane, 'eleanor', 'Eleanor', ['famB']);
const angie = tree.addChild(zhane, 'angie', 'Angie', ['famB']);
const laurenH = tree.addChild(zhane, 'laurenH', 'Lauren H', ['famB']);

const mansiL = tree.addChild(eleanor, 'mansiL', 'Mansi L', ['famB']);

const isabellaG = tree.addChild(angie, 'isabellaG', 'Isabella G', ['famB']);
const isaL = tree.addChild(isabellaG, 'isaL', 'Isa L', ['famB']);
const helenG = tree.addChild(isaL, 'helenG', 'Helen G', ['famB']);

// famB x tequila fam
const mZoeIsa = tree.marry(zoeL, isaL);
const saraP = tree.addChild(mZoeIsa, 'saraP', 'Sara P', ['famB', 'tequila fam']);
const shizuka = tree.addChild(mZoeIsa, 'shizuka', 'Shizuka', ['famB', 'tequila fam']);

// famC famE
const shannon = tree.add('shannon', 'Shannon', ['famC']);
const anneMarie = tree.addChild(shannon, 'anneMarie', "Anne Marie", ['famC']);
const aubrey = tree.addChild(anneMarie, 'aubrey', 'Aubrey', ['famC']);
const tenley = tree.addChild(aubrey, 'tenley', 'Tenley', ['famC']);
const amanda = tree.addChild(aubrey, 'amanda', 'Amanda', ['famC']);
const janeGreen = tree.addChild(amanda, 'janeGreen', 'Jane Green', ['famC']);
const lucia = tree.addChild(janeGreen, 'lucia', 'Lucia', ['famC']);

// famD
const kelsey = tree.addChild(shannon, 'kelsey', 'Kelsey', ['famD']);
const kayla = tree.addChild(kelsey, 'kayla', 'Kayla', ['famD']);
const allie = tree.addChild(kayla, 'allie', 'Allie', ['famD']);
const zoe = tree.addChild(allie, 'zoe', 'Zoe', ['famD']);
const jen = tree.addChild(zoe, 'jen', 'Jen', ['famD']);
const micks = tree.addChild(jen, 'micks', 'Micks', ['famD']);
const nawalS = tree.addChild(micks, 'nawalS', 'Nawal S', ['famD']);
const jasM = tree.addChild(nawalS, 'jasM', 'Jas M', ['famD']);

//famE
const sarahC = tree.addChild(jen, 'sarahC', 'Sarah C', ['famE']);
const carsonT = tree.addChild(sarahC, 'carsonT', 'Carson T', ['famE']);
const meganD = tree.addChild(carsonT, 'meganD', 'Megan D', ['famE']);
const chantelT = tree.addChild(carsonT, 'chantelT', 'Chantel T', ['famE']);
const gabbyL = tree.addChild(carsonT, 'gabbyL', 'Gabby L', ['famE']);
const hannahC = tree.addChild(gabbyL, 'hannahC', 'Hannah C', ['famE']);
const annabelleP = tree.addChild(hannahC, 'annabelleP', 'Annabelle P', ['famE']);
const iris = tree.addChild(hannahC, 'iris', 'Iris', ['famE']);
const mIrisShizuka = tree.marry(shizuka, iris); 

// famE x famB x tequila family
const djanaya = tree.addChild(mIrisShizuka, 'djanaya', 'Djanaya', ['famB', 'tequila fam', 'famE']);

// sab family
const sheila = tree.addChild(lucia, 'sheila', 'Sheila', ['sab family']);
const danielle = tree.addChild(sheila, 'danielle', 'Danielle', ['sab family']);
const delaneyM = tree.addChild(danielle, 'delaneyM', 'Delaney M', ['sab family']);
const aliciaS = tree.addChild(danielle, 'aliciaS', 'Alicia S', ['sab family']);
const haleyR = tree.addChild(delaneyM, 'haleyR', 'haleyR', ['sab family']);
const lucilleS = tree.addChild(haleyR, 'lucilleS', 'Lucille S', ['sab family']);
const abbyK = tree.addChild(lucilleS, 'abbyK', 'Abby K', ['sab family']);

const addieH = tree.addChild(abbyK, 'addieH', 'Addie H', ['sab family']);
const claireB = tree.addChild(addieH, 'claireB', 'Claire B', ['sab family']);
const rica = tree.addChild(claireB, 'rica', 'Rica', ['sab family']);
const aria = tree.addChild(claireB, 'aria', 'Aria', ['sab family']);

const lilyH = tree.addChild(abbyK, 'lilyH', 'Lily H', ['sab family']);
const gisselle = tree.addChild(lilyH, 'gisselle', 'Gisselle', ['sab family']);
const sydneyK = tree.addChild(lilyH, 'sydneyK', 'Sydney K', ['sab family']);
const amandaM = tree.addChild(sydneyK, 'amandaM', 'Amanda M', ['sab family']);

const kaiya = tree.addChild(sydneyK, 'kaiya', 'Kaiya', ['sab family']);
const teagan = tree.addChild(kaiya, 'teagan', 'teagan', ['sab family']);
const marycarla = tree.addChild(kaiya, 'marycarla', 'MaryCarla', ['sab family']);
const paigeP = tree.addChild(kaiya, 'paigeP', 'Paige P', ['sab family']);
const elizabethC = tree.addChild(kaiya, 'elizabethC', 'Elizabeth C', ['sab family']);


console.log(JSON.stringify([...tree.people.values()], null, 2));
