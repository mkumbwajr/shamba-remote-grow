
export const countries = [
  'afghanistan', 'albania', 'algeria', 'andorra', 'angola', 'antigua_and_barbuda', 
  'argentina', 'armenia', 'australia', 'austria', 'azerbaijan', 'bahamas', 'bahrain', 
  'bangladesh', 'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bhutan', 
  'bolivia', 'bosnia_and_herzegovina', 'botswana', 'brazil', 'brunei', 'bulgaria', 
  'burkina_faso', 'burundi', 'cabo_verde', 'cambodia', 'cameroon', 'canada', 
  'central_african_republic', 'chad', 'chile', 'china', 'colombia', 'comoros', 
  'congo', 'costa_rica', 'croatia', 'cuba', 'cyprus', 'czech_republic', 'denmark', 
  'djibouti', 'dominica', 'dominican_republic', 'ecuador', 'egypt', 'el_salvador', 
  'equatorial_guinea', 'eritrea', 'estonia', 'eswatini', 'ethiopia', 'fiji', 
  'finland', 'france', 'gabon', 'gambia', 'georgia', 'germany', 'ghana', 'greece', 
  'grenada', 'guatemala', 'guinea', 'guinea_bissau', 'guyana', 'haiti', 'honduras', 
  'hungary', 'iceland', 'india', 'indonesia', 'iran', 'iraq', 'ireland', 'israel', 
  'italy', 'jamaica', 'japan', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 
  'kosovo', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 
  'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'madagascar', 
  'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshall_islands', 
  'mauritania', 'mauritius', 'mexico', 'micronesia', 'moldova', 'monaco', 
  'mongolia', 'montenegro', 'morocco', 'mozambique', 'myanmar', 'namibia', 
  'nauru', 'nepal', 'netherlands', 'new_zealand', 'nicaragua', 'niger', 'nigeria', 
  'north_korea', 'north_macedonia', 'norway', 'oman', 'pakistan', 'palau', 
  'palestine', 'panama', 'papua_new_guinea', 'paraguay', 'peru', 'philippines', 
  'poland', 'portugal', 'qatar', 'romania', 'russia', 'rwanda', 'saint_kitts_and_nevis', 
  'saint_lucia', 'saint_vincent_and_the_grenadines', 'samoa', 'san_marino', 
  'sao_tome_and_principe', 'saudi_arabia', 'senegal', 'serbia', 'seychelles', 
  'sierra_leone', 'singapore', 'slovakia', 'slovenia', 'solomon_islands', 'somalia', 
  'south_africa', 'south_korea', 'south_sudan', 'spain', 'sri_lanka', 'sudan', 
  'suriname', 'sweden', 'switzerland', 'syria', 'taiwan', 'tajikistan', 'tanzania', 
  'thailand', 'timor_leste', 'togo', 'tonga', 'trinidad_and_tobago', 'tunisia', 
  'turkey', 'turkmenistan', 'tuvalu', 'uganda', 'ukraine', 'united_arab_emirates', 
  'united_kingdom', 'united_states', 'uruguay', 'uzbekistan', 'vanuatu', 'vatican_city', 
  'venezuela', 'vietnam', 'yemen', 'zambia', 'zimbabwe'
];

export const regionsByCountry: Record<string, string[]> = {
  tanzania: [
    'arusha', 'dar_es_salaam', 'dodoma', 'geita', 'iringa', 'kagera', 'katavi', 
    'kigoma', 'kilimanjaro', 'lindi', 'manyara', 'mara', 'mbeya', 'morogoro', 
    'mtwara', 'mwanza', 'njombe', 'pemba_north', 'pemba_south', 'pwani', 
    'rukwa', 'ruvuma', 'shinyanga', 'simiyu', 'singida', 'songwe', 'tabora', 
    'tanga', 'unguja_north', 'unguja_south'
  ],
  kenya: [
    'baringo', 'bomet', 'bungoma', 'busia', 'elgeyo_marakwet', 'embu', 'garissa', 
    'homa_bay', 'isiolo', 'kajiado', 'kakamega', 'kericho', 'kiambu', 'kilifi', 
    'kirinyaga', 'kisii', 'kisumu', 'kitui', 'kwale', 'laikipia', 'lamu', 
    'machakos', 'makueni', 'mandera', 'marsabit', 'meru', 'migori', 'mombasa', 
    'murang_a', 'nairobi', 'nakuru', 'nandi', 'narok', 'nyamira', 'nyandarua', 
    'nyeri', 'samburu', 'siaya', 'taita_taveta', 'tana_river', 'tharaka_nithi', 
    'trans_nzoia', 'turkana', 'uasin_gishu', 'vihiga', 'wajir', 'west_pokot'
  ],
  uganda: [
    'abim', 'adjumani', 'agago', 'alebtong', 'amolatar', 'amudat', 'amuria', 
    'amuru', 'apac', 'arua', 'budaka', 'bududa', 'bugiri', 'buhweju', 'buikwe', 
    'bukomansimbi', 'bukwo', 'bulambuli', 'buliisa', 'bundibugyo', 'bunyangabu', 
    'bushenyi', 'busia', 'butaleja', 'butambala', 'butebo', 'buvuma', 'buyende', 
    'dokolo', 'gomba', 'gulu', 'hoima', 'ibanda', 'iganga', 'isingiro', 'jinja', 
    'kaabong', 'kabale', 'kabarole', 'kaberamaido', 'kalangala', 'kaliro', 
    'kalungu', 'kampala', 'kamuli', 'kamwenge', 'kanungu', 'kapchorwa', 'kasese', 
    'katakwi', 'kayunga', 'kibaale', 'kiboga', 'kibuku', 'kiruhura', 'kiryandongo', 
    'kisoro', 'kitgum', 'koboko', 'kole', 'kotido', 'kumi', 'kween', 'kyankwanzi', 
    'kyegegwa', 'kyenjojo', 'lamwo', 'lira', 'luuka', 'luwero', 'lwengo', 
    'lyantonde', 'manafwa', 'maracha', 'masaka', 'masindi', 'mayuge', 'mbale', 
    'mbarara', 'mitooma', 'mityana', 'moroto', 'moyo', 'mpigi', 'mubende', 
    'mukono', 'nakapiripirit', 'nakaseke', 'nakasongola', 'namayingo', 'namisindwa', 
    'namutumba', 'napak', 'nebbi', 'ngora', 'ntoroko', 'ntungamo', 'nwoya', 
    'otuke', 'oyam', 'pader', 'pallisa', 'rakai', 'rubanda', 'rubirizi', 'rukiga', 
    'rukungiri', 'serere', 'sheema', 'sironko', 'soroti', 'tororo', 'wakiso', 
    'yumbe', 'zombo'
  ],
  united_states: [
    'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 
    'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 
    'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 
    'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 
    'missouri', 'montana', 'nebraska', 'nevada', 'new_hampshire', 'new_jersey', 
    'new_mexico', 'new_york', 'north_carolina', 'north_dakota', 'ohio', 
    'oklahoma', 'oregon', 'pennsylvania', 'rhode_island', 'south_carolina', 
    'south_dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 
    'washington', 'west_virginia', 'wisconsin', 'wyoming'
  ],
  canada: [
    'alberta', 'british_columbia', 'manitoba', 'new_brunswick', 'newfoundland_and_labrador', 
    'northwest_territories', 'nova_scotia', 'nunavut', 'ontario', 'prince_edward_island', 
    'quebec', 'saskatchewan', 'yukon'
  ],
  united_kingdom: [
    'england', 'scotland', 'wales', 'northern_ireland'
  ],
  australia: [
    'australian_capital_territory', 'new_south_wales', 'northern_territory', 
    'queensland', 'south_australia', 'tasmania', 'victoria', 'western_australia'
  ],
  nigeria: [
    'abia', 'adamawa', 'akwa_ibom', 'anambra', 'bauchi', 'bayelsa', 'benue', 
    'borno', 'cross_river', 'delta', 'ebonyi', 'edo', 'ekiti', 'enugu', 
    'gombe', 'imo', 'jigawa', 'kaduna', 'kano', 'katsina', 'kebbi', 'kogi', 
    'kwara', 'lagos', 'nasarawa', 'niger', 'ogun', 'ondo', 'osun', 'oyo', 
    'plateau', 'rivers', 'sokoto', 'taraba', 'yobe', 'zamfara', 'fct'
  ],
  south_africa: [
    'eastern_cape', 'free_state', 'gauteng', 'kwazulu_natal', 'limpopo', 
    'mpumalanga', 'northern_cape', 'north_west', 'western_cape'
  ]
};

export const languages = [
  'english', 'spanish', 'french', 'german', 'italian', 'portuguese', 'russian', 
  'chinese_mandarin', 'japanese', 'korean', 'arabic', 'hindi', 'bengali', 
  'urdu', 'indonesian', 'malay', 'thai', 'vietnamese', 'turkish', 'persian', 
  'hebrew', 'swahili', 'amharic', 'yoruba', 'igbo', 'hausa', 'zulu', 'xhosa', 
  'afrikaans', 'somali', 'oromo', 'tigrinya', 'dutch', 'swedish', 'norwegian', 
  'danish', 'finnish', 'polish', 'czech', 'slovak', 'hungarian', 'romanian', 
  'bulgarian', 'serbian', 'croatian', 'slovenian', 'lithuanian', 'latvian', 
  'estonian', 'ukrainian', 'belarusian', 'greek', 'albanian', 'macedonian', 
  'montenegrin', 'bosnian'
];
