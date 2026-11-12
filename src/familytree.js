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

// la fam
const chloeM = tree.add('chloeM', "Chloe M", ['la fam']);
const carlyS = tree.add('carlyS', "Carly S", ['la fam'], chloeM);

const saraC = tree.addChild(carlyS, 'saraC', 'Sara C', ['la fam']);
const meganB = tree.addChild(carlyS, 'meganB', 'Megan B', ['la fam']);

const vivianC = tree.addChild(saraC, 'vivianC', 'Vivian C', ['la fam']);
const cari = tree.addChild(vivianC, 'car', 'Cari', ["la fam"]);
const emily = tree.addChild(cari, 'emily', 'Emily', ['la fam']);
const zoeL = tree.addChild(cari, 'zoeL', 'Zoe L', ['la fam']);

const alyS = tree.addChild(emily, 'alyS', 'Aly S', ['la fam']);
const phoebe = tree.addChild(alyS, 'phoebe', "Phoebe", ['la famm']);


console.log(JSON.stringify([...tree.people.values()], null, 2));
