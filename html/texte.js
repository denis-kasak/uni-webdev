//texte für billiger.de vergleich.org verifox check24 idealo
const texte = {
    billiger:"Billiger.de ist eine deutsche Webseite, die Benutzern dabei hilft, Produkte verschiedener Kategorien zu vergleichen und den besten Preis zu finden. Die Webseite verfügt über eine umfangreiche Datenbank von Produkten, die von verschiedenen Online-Shops verkauft werden. Benutzer können nach Produktkategorien suchen oder gezielt nach bestimmten Produkten suchen.",
    vergleich:"Vergleich.org ist eine Online-Plattform, die Verbrauchern dabei hilft, die besten Produkte in verschiedenen Kategorien zu finden. Die Seite bietet eine breite Palette von Kategorien, darunter Elektronik, Haushaltsgeräte, Sport und Freizeit, Gesundheit und Beauty sowie viele andere.",
    verifox:"Verifox ist ein Online-Vergleichsportal, das Verbrauchern dabei hilft, die besten Tarife für Strom, Gas, DSL und Mobilfunk zu finden. Das Portal wurde im Jahr 2007 gegründet und hat seinen Hauptsitz in Berlin.",
    check24:"Check24 ist ein führendes Online-Vergleichsportal in Deutschland. Es bietet seinen Nutzern eine Vielzahl von Vergleichsmöglichkeiten in verschiedenen Kategorien wie Finanzen, Versicherungen, Energie, Telekommunikation und Reisen.",
    idealo:"Ideaolo ist eine Online-Plattform, die es Benutzern ermöglicht, Produkte zu vergleichen und das beste Angebot zu finden. Die Plattform bietet eine breite Palette von Produkten an, darunter Elektronik, Haushaltsgeräte, Mode, Sportartikel und vieles mehr.",
}
function onLoad(){
    document.getElementById("check24Para").innerHTML=texte.check24;
    document.getElementById("billigerPara").innerHTML=texte.billiger;
    document.getElementById("vergleichPara").innerHTML=texte.vergleich;
    document.getElementById("verifoxPara").innerHTML=texte.verifox;
    document.getElementById("idealoPara").innerHTML=texte.idealo;
}