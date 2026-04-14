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
		'icon-star-menu': '&#xe900;',
		'icon-share-fill': '&#xe901;',
		'icon-mobile-bar': '&#xe902;',
		'icon-gastro-dinner': '&#xe903;',
		'icon-master-classes': '&#xe904;',
		'icon-headset': '&#xe905;',
		'icon-catering-main': '&#xe906;',
		'icon-photographer': '&#xe907;',
		'icon-decorator': '&#xe908;',
		'icon-tech-support': '&#xe909;',
		'icon-video-conference': '&#xe90a;',
		'icon-catering': '&#xe90b;',
		'icon-lcd-panel': '&#xe90c;',
		'icon-notebooks-pens': '&#xe90d;',
		'icon-podium': '&#xe90e;',
		'icon-plasma-tv-stand': '&#xe90f;',
		'icon-water': '&#xe910;',
		'icon-laser-pointer': '&#xe911;',
		'icon-gooseneck-mic': '&#xe912;',
		'icon-clicker': '&#xe913;',
		'icon-laptop': '&#xe914;',
		'icon-flipchart': '&#xe915;',
		'icon-microphone': '&#xe916;',
		'icon-sound-system': '&#xe917;',
		'icon-projector': '&#xe918;',
		'icon-screen': '&#xe919;',
		'icon-hair-dryer': '&#xe91a;',
		'icon-toiletries': '&#xe91b;',
		'icon-shower-cabin': '&#xe91c;',
		'icon-aqua-zone': '&#xe91d;',
		'icon-bathrobe': '&#xe91e;',
		'icon-washing-machine': '&#xe91f;',
		'icon-tableware': '&#xe920;',
		'icon-kettle': '&#xe921;',
		'icon-microwave': '&#xe922;',
		'icon-cooktop': '&#xe923;',
		'icon-fridge': '&#xe924;',
		'icon-sofa-bed': '&#xe925;',
		'icon-iron-board': '&#xe926;',
		'icon-air-conditioner': '&#xe927;',
		'icon-work-area': '&#xe928;',
		'icon-wi-fi': '&#xe929;',
		'icon-tv': '&#xe92a;',
		'icon-single-beds': '&#xe92b;',
		'icon-double-bed': '&#xe92c;',
		'icon-max': '&#xe92d;',
		'icon-events-tri-konferens-zala': '&#xe92e;',
		'icon-events-special-tariffs': '&#xe92f;',
		'icon-events-prostornye-nomera': '&#xe930;',
		'icon-events-parkovka': '&#xe931;',
		'icon-events-personal-manager': '&#xe932;',
		'icon-events-raspolozhenie': '&#xe933;',
		'icon-events-avtorkaya-kuhnya': '&#xe934;',
		'icon-events-panoramnye-okna': '&#xe935;',
		'icon-events-basseyn': '&#xe936;',
		'icon-events-infrastructura': '&#xe937;',
		'icon-events-vremya': '&#xe938;',
		'icon-events-catering': '&#xe939;',
		'icon-events-banketnoe-menu': '&#xe93a;',
		'icon-events-dva-restorana': '&#xe93b;',
		'icon-events-razmeshcheniye-gostey': '&#xe93c;',
		'icon-events-territoriya': '&#xe93d;',
		'icon-hh-icon': '&#xe93f;',
		'icon-gis-icon': '&#xe940;',
		'icon-share': '&#xe941;',
		'icon-copy-fill': '&#xe942;',
		'icon-person': '&#xe943;',
		'icon-3d': '&#xe945;',
		'icon-area': '&#xe946;',
		'icon-arrow-left': '&#xe947;',
		'icon-arrow-right': '&#xe948;',
		'icon-book': '&#xe949;',
		'icon-burger': '&#xe94a;',
		'icon-caplya': '&#xe94b;',
		'icon-chevron-down': '&#xe94d;',
		'icon-chevron-left': '&#xe94e;',
		'icon-chevron-link': '&#xe94f;',
		'icon-chevron-right': '&#xe950;',
		'icon-chevron-top': '&#xe951;',
		'icon-close': '&#xe952;',
		'icon-delovoy': '&#xe953;',
		'icon-elem-bed': '&#xe954;',
		'icon-elem-phen': '&#xe955;',
		'icon-elem-pool': '&#xe956;',
		'icon-elem-tablichka': '&#xe957;',
		'icon-family': '&#xe958;',
		'icon-friends': '&#xe959;',
		'icon-geo': '&#xe95a;',
		'icon-mail': '&#xe95b;',
		'icon-menu': '&#xe95c;',
		'icon-para': '&#xe95d;',
		'icon-pdf': '&#xe95e;',
		'icon-places': '&#xe95f;',
		'icon-play': '&#xe960;',
		'icon-route': '&#xe961;',
		'icon-services-board': '&#xe962;',
		'icon-services-coffee-machine': '&#xe963;',
		'icon-services-condicioner': '&#xe964;',
		'icon-services-electric-kettle': '&#xe965;',
		'icon-services-garderob': '&#xe966;',
		'icon-services-holodilnik': '&#xe967;',
		'icon-services-kids-bedroom': '&#xe968;',
		'icon-services-master-bedroom': '&#xe969;',
		'icon-services-microwave': '&#xe96a;',
		'icon-services-places': '&#xe96b;',
		'icon-services-tv': '&#xe96c;',
		'icon-services-wifi': '&#xe96d;',
		'icon-solo': '&#xe96e;',
		'icon-star': '&#xe96f;',
		'icon-telegram': '&#xe970;',
		'icon-vk': '&#xe971;',
		'icon-whatsapp': '&#xe972;',
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
