/** @param {NS} ns */
import { SLEEP_TIME, MAX_MEMBERS, FACTIONS } from "./Gang/constants.js";
import { setTask, territoryWar, ascend, buyEquipment } from "./Gang/functions.js";
export async function main(ns) {
	const G = ns.gang;
	const INFO = G.getGangInformation();
	var strength = 0;
	var winChance = 0;
	let memberNames = G.getMemberNames();
	let index = 0;
	let enemyFactions = FACTIONS;
	for (let i = 0; i < enemyFactions.length; ++i) {
		if (enemyFactions[i] == INFO.faction) {
			index = i;
			break;
		}
	}
	enemyFactions.splice(index, 1);
	while (true) {
		if (memberNames.length < MAX_MEMBERS) ns.spawn("gangStartup.js", 1);
		for (let i = 0; i < MAX_MEMBERS; ++i) {
			let member = memberNames[i];
			let memberInfo = G.getMemberInformation(member);
			let wantedLevel = INFO.wantedPenalty;
			let territory = INFO.territory;
			strength = memberInfo.str;
			setTask(G, member, wantedLevel, territory, strength);
			winChance = territoryWar(G, enemyFactions);
			ascend(ns, G, member);
		}
		buyEquipment(ns, G, winChance, memberNames);
		await ns.sleep(SLEEP_TIME);
	}
}
