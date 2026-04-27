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
		'icon-events-dva-restorana-2': '&#xe900;',
		'icon-events-residence': '&#xe901;',
		'icon-events-garderob': '&#xe902;',
		'icon-events-lounge': '&#xe903;',
		'icon-events-parkovka-2': '&#xe904;',
		'icon-events-spa': '&#xe905;',
		'icon-star-menu': '&#xe906;',
		'icon-share-fill': '&#xe907;',
		'icon-mobile-bar': '&#xe908;',
		'icon-gastro-dinner': '&#xe909;',
		'icon-master-classes': '&#xe90a;',
		'icon-headset': '&#xe90b;',
		'icon-catering-main': '&#xe90c;',
		'icon-photographer': '&#xe90d;',
		'icon-decorator': '&#xe90e;',
		'icon-tech-support': '&#xe90f;',
		'icon-video-conference': '&#xe910;',
		'icon-catering': '&#xe911;',
		'icon-lcd-panel': '&#xe912;',
		'icon-notebooks-pens': '&#xe913;',
		'icon-podium': '&#xe914;',
		'icon-plasma-tv-stand': '&#xe915;',
		'icon-water': '&#xe916;',
		'icon-laser-pointer': '&#xe917;',
		'icon-gooseneck-mic': '&#xe918;',
		'icon-clicker': '&#xe919;',
		'icon-laptop': '&#xe91a;',
		'icon-flipchart': '&#xe91b;',
		'icon-microphone': '&#xe91c;',
		'icon-sound-system': '&#xe91d;',
		'icon-projector': '&#xe91e;',
		'icon-screen': '&#xe91f;',
		'icon-hair-dryer': '&#xe920;',
		'icon-toiletries': '&#xe921;',
		'icon-shower-cabin': '&#xe922;',
		'icon-aqua-zone': '&#xe923;',
		'icon-bathrobe': '&#xe924;',
		'icon-washing-machine': '&#xe925;',
		'icon-tableware': '&#xe926;',
		'icon-kettle': '&#xe927;',
		'icon-microwave': '&#xe928;',
		'icon-cooktop': '&#xe929;',
		'icon-fridge': '&#xe92a;',
		'icon-sofa-bed': '&#xe92b;',
		'icon-iron-board': '&#xe92c;',
		'icon-air-conditioner': '&#xe92d;',
		'icon-work-area': '&#xe92e;',
		'icon-wi-fi': '&#xe92f;',
		'icon-tv': '&#xe930;',
		'icon-single-beds': '&#xe931;',
		'icon-double-bed': '&#xe932;',
		'icon-max': '&#xe933;',
		'icon-events-tri-konferens-zala': '&#xe934;',
		'icon-events-special-tariffs': '&#xe935;',
		'icon-events-prostornye-nomera': '&#xe936;',
		'icon-events-parkovka': '&#xe937;',
		'icon-events-personal-manager': '&#xe938;',
		'icon-events-raspolozhenie': '&#xe939;',
		'icon-events-avtorkaya-kuhnya': '&#xe93a;',
		'icon-events-panoramnye-okna': '&#xe93b;',
		'icon-events-basseyn': '&#xe93c;',
		'icon-events-infrastructura': '&#xe93d;',
		'icon-events-vremya': '&#xe93e;',
		'icon-events-catering': '&#xe93f;',
		'icon-events-banketnoe-menu': '&#xe940;',
		'icon-events-dva-restorana': '&#xe941;',
		'icon-events-razmeshcheniye-gostey': '&#xe942;',
		'icon-events-territoriya': '&#xe943;',
		'icon-hh-icon': '&#xe945;',
		'icon-2gis-icon': '&#xe946;',
		'icon-share': '&#xe947;',
		'icon-copy-fill': '&#xe948;',
		'icon-person': '&#xe949;',
		'icon-3d': '&#xe94b;',
		'icon-area': '&#xe94c;',
		'icon-arrow-left': '&#xe94d;',
		'icon-arrow-right': '&#xe94e;',
		'icon-book': '&#xe94f;',
		'icon-burger': '&#xe950;',
		'icon-caplya': '&#xe951;',
		'icon-chevron-down': '&#xe953;',
		'icon-chevron-left': '&#xe954;',
		'icon-chevron-link': '&#xe955;',
		'icon-chevron-right': '&#xe956;',
		'icon-chevron-top': '&#xe957;',
		'icon-close': '&#xe958;',
		'icon-delovoy': '&#xe959;',
		'icon-elem-bed': '&#xe95a;',
		'icon-elem-phen': '&#xe95b;',
		'icon-elem-pool': '&#xe95c;',
		'icon-elem-tablichka': '&#xe95d;',
		'icon-family': '&#xe95e;',
		'icon-friends': '&#xe95f;',
		'icon-geo': '&#xe960;',
		'icon-mail': '&#xe961;',
		'icon-menu': '&#xe962;',
		'icon-para': '&#xe963;',
		'icon-pdf': '&#xe964;',
		'icon-places': '&#xe965;',
		'icon-play': '&#xe966;',
		'icon-route': '&#xe967;',
		'icon-services-board': '&#xe968;',
		'icon-services-coffee-machine': '&#xe969;',
		'icon-services-condicioner': '&#xe96a;',
		'icon-services-electric-kettle': '&#xe96b;',
		'icon-services-garderob': '&#xe96c;',
		'icon-services-holodilnik': '&#xe96d;',
		'icon-services-kids-bedroom': '&#xe96e;',
		'icon-services-master-bedroom': '&#xe96f;',
		'icon-services-microwave': '&#xe970;',
		'icon-services-places': '&#xe971;',
		'icon-services-tv': '&#xe972;',
		'icon-services-wifi': '&#xe973;',
		'icon-solo': '&#xe974;',
		'icon-star': '&#xe975;',
		'icon-telegram': '&#xe976;',
		'icon-vk': '&#xe977;',
		'icon-whatsapp': '&#xe978;',
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
