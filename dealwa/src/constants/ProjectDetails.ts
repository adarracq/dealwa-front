import Colors from "./Colors";

export default {
    types: [
        { label: 'Achat', value: 0 },
        { label: 'Vente', value: 1 },
        { label: 'Location', value: 2 },
        { label: 'Gestion locative', value: 3 }
    ],
    categories: [
        { label: 'Appartement', value: 0 },
        { label: 'Maison', value: 1 },
        { label: 'Terrain', value: 2 },
        { label: 'Bureau', value: 3 },
        { label: 'Magasin', value: 4 },
        { label: 'Entrepôt', value: 5 },
        { label: 'Garage', value: 6 },
        { label: 'Autre', value: 7 }
    ],
    tags: [
        { label: 'Nouveau', value: 0, color: Colors.lightGreen },
        { label: 'Urgent', value: 1, color: Colors.mainRed },
        { label: 'En cours', value: 2, color: Colors.mainBlue },
    ]
}