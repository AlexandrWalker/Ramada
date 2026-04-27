/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'RamadaIconFont\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-events-garderob': '&#xe900;',
		'icon-events-lounge': '&#xe901;',
		'icon-events-parkovka-2': '&#xe902;',
		'icon-events-spa': '&#xe903;',
		'icon-star-menu': '&#xe904;',
		'icon-share-fill': '&#xe905;',
		'icon-mobile-bar': '&#xe906;',
		'icon-gastro-dinner': '&#xe907;',
		'icon-master-classes': '&#xe908;',
		'icon-headset': '&#xe909;',
		'icon-catering-main': '&#xe90a;',
		'icon-photographer': '&#xe90b;',
		'icon-decorator': '&#xe90c;',
		'icon-tech-support': '&#xe90d;',
		'icon-video-conference': '&#xe90e;',
		'icon-catering': '&#xe90f;',
		'icon-lcd-panel': '&#xe910;',
		'icon-notebooks-pens': '&#xe911;',
		'icon-podium': '&#xe912;',
		'icon-plasma-tv-stand': '&#xe913;',
		'icon-water': '&#xe914;',
		'icon-laser-pointer': '&#xe915;',
		'icon-gooseneck-mic': '&#xe916;',
		'icon-clicker': '&#xe917;',
		'icon-laptop': '&#xe918;',
		'icon-flipchart': '&#xe919;',
		'icon-microphone': '&#xe91a;',
		'icon-sound-system': '&#xe91b;',
		'icon-projector': '&#xe91c;',
		'icon-screen': '&#xe91d;',
		'icon-hair-dryer': '&#xe91e;',
		'icon-toiletries': '&#xe91f;',
		'icon-shower-cabin': '&#xe920;',
		'icon-aqua-zone': '&#xe921;',
		'icon-bathrobe': '&#xe922;',
		'icon-washing-machine': '&#xe923;',
		'icon-tableware': '&#xe924;',
		'icon-kettle': '&#xe925;',
		'icon-microwave': '&#xe926;',
		'icon-cooktop': '&#xe927;',
		'icon-fridge': '&#xe928;',
		'icon-sofa-bed': '&#xe929;',
		'icon-iron-board': '&#xe92a;',
		'icon-air-conditioner': '&#xe92b;',
		'icon-work-area': '&#xe92c;',
		'icon-wi-fi': '&#xe92d;',
		'icon-tv': '&#xe92e;',
		'icon-single-beds': '&#xe92f;',
		'icon-double-bed': '&#xe930;',
		'icon-max': '&#xe931;',
		'icon-events-tri-konferens-zala': '&#xe932;',
		'icon-events-special-tariffs': '&#xe933;',
		'icon-events-prostornye-nomera': '&#xe934;',
		'icon-events-parkovka': '&#xe935;',
		'icon-events-personal-manager': '&#xe936;',
		'icon-events-raspolozhenie': '&#xe937;',
		'icon-events-avtorkaya-kuhnya': '&#xe938;',
		'icon-events-panoramnye-okna': '&#xe939;',
		'icon-events-basseyn': '&#xe93a;',
		'icon-events-infrastructura': '&#xe93b;',
		'icon-events-vremya': '&#xe93c;',
		'icon-events-catering': '&#xe93d;',
		'icon-events-banketnoe-menu': '&#xe93e;',
		'icon-events-dva-restorana': '&#xe93f;',
		'icon-events-razmeshcheniye-gostey': '&#xe940;',
		'icon-events-territoriya': '&#xe941;',
		'icon-hh-icon': '&#xe943;',
		'icon-gis-icon': '&#xe944;',
		'icon-share': '&#xe945;',
		'icon-copy-fill': '&#xe946;',
		'icon-person': '&#xe947;',
		'icon-3d': '&#xe949;',
		'icon-area': '&#xe94a;',
		'icon-arrow-left': '&#xe94b;',
		'icon-arrow-right': '&#xe94c;',
		'icon-book': '&#xe94d;',
		'icon-burger': '&#xe94e;',
		'icon-caplya': '&#xe94f;',
		'icon-chevron-down': '&#xe951;',
		'icon-chevron-left': '&#xe952;',
		'icon-chevron-link': '&#xe953;',
		'icon-chevron-right': '&#xe954;',
		'icon-chevron-top': '&#xe955;',
		'icon-close': '&#xe956;',
		'icon-delovoy': '&#xe957;',
		'icon-elem-bed': '&#xe958;',
		'icon-elem-phen': '&#xe959;',
		'icon-elem-pool': '&#xe95a;',
		'icon-elem-tablichka': '&#xe95b;',
		'icon-family': '&#xe95c;',
		'icon-friends': '&#xe95d;',
		'icon-geo': '&#xe95e;',
		'icon-mail': '&#xe95f;',
		'icon-menu': '&#xe960;',
		'icon-para': '&#xe961;',
		'icon-pdf': '&#xe962;',
		'icon-places': '&#xe963;',
		'icon-play': '&#xe964;',
		'icon-route': '&#xe965;',
		'icon-services-board': '&#xe966;',
		'icon-services-coffee-machine': '&#xe967;',
		'icon-services-condicioner': '&#xe968;',
		'icon-services-electric-kettle': '&#xe969;',
		'icon-services-garderob': '&#xe96a;',
		'icon-services-holodilnik': '&#xe96b;',
		'icon-services-kids-bedroom': '&#xe96c;',
		'icon-services-master-bedroom': '&#xe96d;',
		'icon-services-microwave': '&#xe96e;',
		'icon-services-places': '&#xe96f;',
		'icon-services-tv': '&#xe970;',
		'icon-services-wifi': '&#xe971;',
		'icon-solo': '&#xe972;',
		'icon-star': '&#xe973;',
		'icon-telegram': '&#xe974;',
		'icon-vk': '&#xe975;',
		'icon-whatsapp': '&#xe976;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
