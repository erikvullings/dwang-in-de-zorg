import m from 'mithril';
import { IAddress, IPdokSearchResult, pointRegex } from '../../../common/dist';
import { formatPC } from '../utils';

export const pdokLocationSvc = async (loc: IAddress) => {
  const { pc, hn, toev } = loc;
  if (!pc || !hn) {
    M.toast({ html: `Onvoldoende gegevens: ${pc}, ${hn}${toev ? `, ${toev}` : ''} !`, classes: 'red'});
    return;
  }
  const pdokUrl = `https://geodata.nationaalgeoregister.nl/locatieserver/v3/free?q=${pc.replace(
    / /g,
    ''
  )} ${hn} ${toev}`;
  // console.log(`PDOK resolving ${pc}, ${hn}${toev ? `, ${toev}` : ''}`);
  const searchResult = await m.request<IPdokSearchResult>(pdokUrl).catch(_ => {
    M.toast({ html: `Onbekend adres: ${pc}, ${hn}${toev ? `, ${toev}` : ''} !`, classes: 'red'});
    return;
  });
  if (searchResult && searchResult.response && searchResult.response.docs) {
    const {
      response: { docs = [] }
    } = searchResult;
    const found = docs.filter(doc => doc.bron === 'BAG' && doc.type === 'adres');

    if (found.length > 0) {
      const best = found[0];
      const { centroide_ll, centroide_rd, straatnaam, woonplaatsnaam } = best;
      const ll = pointRegex.exec(centroide_ll);
      const rd = pointRegex.exec(centroide_rd);
      if (ll && rd) {
        loc.str = straatnaam;
        loc.wn = woonplaatsnaam;
        loc.pc = formatPC(pc) as string,
        loc.lat = +ll[1];
        loc.lon = +ll[2];
        loc.x = +rd[1];
        loc.y = +rd[2];
        loc.land = 'Nederland';
        return;
      }
    }
  }
  // console.error(`Error resolving ${pc}, ${hn}${toev ? `, ${toev}` : ''}!`);
};
