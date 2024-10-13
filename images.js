const images=[
    /* em branco
    {thumb:"-",src:"-",title:"-",author:"Orangine", date:"-", type:"-", wpp:"-"}
    */ /* #0000 */

    /* Jujuba */
    /* #0001 */ {thumb:"https://i.postimg.cc/pVm4QtMR/01-Elden-Ring-01-02-2024.jpg",src:"https://i.postimg.cc/6KcKX9H2/01-Elden-Ring-01-02-2024.jpg",title:"Elden Ring",author:"Jujuba", date:"26-07-2024", type:"paisagem", wpp:"-"},
    /* #0002 */ {thumb:"https://i.postimg.cc/14xpwFhn/02-Horizon-Zero-Dawn-13-09-2024.jpg",src:"https://i.postimg.cc/gcjN9ygD/02-Horizon-Zero-Dawn-13-09-2024.jpg",title:"Horizon Zero Dawn",author:"Jujuba", date:"13-09-2024", type:"paisagem", wpp:"-"},
    /* #0003 */ {thumb:"https://i.postimg.cc/QCKQFbPZ/03-Elden-Ring-21-08-2024.jpg",src:"https://i.postimg.cc/YrbbyDz0/03-Elden-Ring-21-08-2024.jpg",title:"Elden Ring",author:"Jujuba", date:"21-08-2024", type:"paisagem", wpp:"-"},

    /* Orangine */
    /* #0001 */ {thumb:"https://i.postimg.cc/Pq8vzxy1/001-Life-is-Strange-True-Colors-21-05-2022.jpg",src:"https://i.postimg.cc/D7xQh4bp/001-Life-is-Strange-True-Colors-21-05-2022.jpg",title:"Life is Strange: True Colors",author:"Orangine", date:"21-05-2022", type:"paisagem", wpp:"-"},
    /* #0002 */ {thumb:"https://i.postimg.cc/L6HfKm4M/002-Red-Dead-Redemption-2-06-03-2023.jpg",src:"https://i.postimg.cc/4Zc1c3rn/002-Red-Dead-Redemption-2-06-03-2023.jpg",title:"Red Dead Redemption 2",author:"Orangine", date:"06-03-2023", type:"paisagem", wpp:"-"},
    /* #0003 */ {thumb:"https://i.postimg.cc/SxRMRVzT/003-Baldur-s-Gate-3-09-05-2024.jpg",src:"https://i.postimg.cc/Kxrr9Hc2/003-Baldur-s-Gate-3-09-05-2024.jpg",title:"Baldur's Gate III",author:"Orangine", date:"09-05-2024", type:"retrato", wpp:"-"},
    /* #0004 */ {thumb:"https://i.postimg.cc/qvFC3nsk/004-Deep-Rock-Galactic-19-06-2024.jpg",src:"https://i.postimg.cc/HTY0F9j7/004-Deep-Rock-Galactic-19-06-2024.jpg",title:"Deep Rock Galactic",author:"Orangine", date:"19-06-2024", type:"paisagem", wpp:"-"},
    /* #0005 */ {thumb:"https://i.postimg.cc/4dk78g2q/005-The-First-Descendant-15-07-2024.jpg",src:"https://i.postimg.cc/vQDrZ8rY/005-The-First-Descendant-15-07-2024.jpg",title:"The First Descendant",author:"Orangine", date:"15-07-2024", type:"paisagem", wpp:"-"},
    /* #0006 */ {thumb:"https://i.postimg.cc/PxJrhfVP/006-Remnant-II-21-07-2024.jpg",src:"https://i.postimg.cc/ZTF98CrF/006-Remnant-II-21-07-2024.jpg",title:"Remnant 2",author:"Orangine", date:"21-07-2024", type:"paisagem", wpp:"-"},
    /* #0007 */ {thumb:"https://i.postimg.cc/3RqrwMz9/007-Elden-Ring-26-07-2024.jpg",src:"https://i.postimg.cc/wqq10g2K/007-Elden-Ring-26-07-2024.jpg",title:"Elden Ring",author:"Orangine", date:"26-07-2024", type:"paisagem", wpp:"-"},
    /* #0008 */ {thumb:"https://i.postimg.cc/xdtTWNRw/008-Elden-Ring-26-07-2024.jpg",src:"https://i.postimg.cc/jsrwnzJS/008-Elden-Ring-26-07-2024.jpg",title:"Elden Ring",author:"Orangine", date:"26-07-2024", type:"retrato", wpp:"-"},
    /* #0009 */ {thumb:"https://i.postimg.cc/nLHhRGvK/009-Elden-Ring-26-07-2024.jpg",src:"https://i.postimg.cc/fMdSbHyP/009-Elden-Ring-26-07-2024.jpg",title:"Elden Ring",author:"Orangine", date:"26-07-2024", type:"retrato", wpp:"-"},
    /* #0010 */ {thumb:"https://i.postimg.cc/QVGXpQ8T/010-Elden-Ring-27-07-2024.jpg",src:"https://i.postimg.cc/Kc4RhfCJ/010-Elden-Ring-27-07-2024.jpg",title:"Elden Ring",author:"Orangine", date:"27-07-2024", type:"paisagem", wpp:"-"},
    /* #0011 */ {thumb:"https://i.postimg.cc/ZnybB7Sm/011-Elden-Ring-01-08-2024.jpg",src:"https://i.postimg.cc/0kVb4FXz/011-Elden-Ring-01-08-2024.jpg",title:"Elden Ring",author:"Orangine", date:"01-08-2024", type:"retrato", wpp:"-"},
    /* #0012 */ {thumb:"https://i.postimg.cc/59HLSf94/012-Elden-Ring-03-08-2024.jpg",src:"https://i.postimg.cc/Rmdd90jH/012-Elden-Ring-03-08-2024.jpg",title:"Elden Ring",author:"Orangine", date:"03-08-2024", type:"paisagem", wpp:"-"},
    /* #0013 */ {thumb:"https://i.postimg.cc/dQzdWgD8/013-Baldur-s-Gate-3-25-08-2024.jpg",src:"https://i.postimg.cc/HHL2LggP/013-Baldur-s-Gate-3-25-08-2024.jpg",title:"Baldur's Gate III",author:"Orangine", date:"25-08-2024", type:"paisagem", wpp:"-"},
    /* #0014 */ {thumb:"https://i.postimg.cc/dVFCFd23/014-Baldur-s-Gate-3-02-09-2024.jpg",src:"https://i.postimg.cc/PTpQmQNW/014-Baldur-s-Gate-3-02-09-2024.jpg",title:"Baldur's Gate III",author:"Orangine", date:"02-09-2024", type:"retrato", wpp:"-"},
    /* #0015 */ {thumb:"https://i.postimg.cc/NjxHjMD4/015-Baldur-s-Gate-3-28-08-2024.jpg",src:"https://i.postimg.cc/7wFMXJTp/015-Baldur-s-Gate-3-28-08-2024.jpg",title:"Baldur's Gate III",author:"Orangine", date:"28-08-2024", type:"paisagem", wpp:"-"},
    /* #0016 */ {thumb:"https://i.postimg.cc/g20Y32d4/016-STAR-WARS-Jedi-Survivor-16-09-2024.jpg",src:"https://i.postimg.cc/wgX781rK/016-STAR-WARS-Jedi-Survivor-16-09-2024.jpg",title:"Star Wars Jedi: Survivor",author:"Orangine", date:"16-09-2024", type:"paisagem", wpp:"-"},
    /* #0017 */ {thumb:"https://i.postimg.cc/ZKbZh59Z/017-STAR-WARS-Jedi-Survivor-18-09-2024.jpg",src:"https://i.postimg.cc/4Zt3VKsK/017-STAR-WARS-Jedi-Survivor-18-09-2024.jpg",title:"Star Wars Jedi: Survivor",author:"Orangine", date:"18-09-2024", type:"paisagem", wpp:"-"},
    /* #0018 */ {thumb:"https://i.postimg.cc/d1g7xTQq/018-Borderlands-2-02-10-2024.jpg",src:"https://i.postimg.cc/rVwSzSvt/018-Borderlands-2-02-10-2024.jpg",title:"Borderlands 2",author:"Orangine", date:"02-10-2024", type:"retrato", wpp:"-"},
    /* #0019 */ {thumb:"https://i.postimg.cc/NF10CJP4/019-Borderlands-3-07-10-2024.jpg",src:"https://i.postimg.cc/NsnrMZ6W/019-Borderlands-3-07-10-2024.jpg",title:"Borderlands 3",author:"Orangine", date:"07-10-2024", type:"retrato", wpp:"-"},
    /* #0019 */ {thumb:"https://i.postimg.cc/9FwKN4m0/20-Baldur-s-Gate-3-13-10-2024.jpg",src:"https://i.postimg.cc/LRxS5fGt/20-Baldur-s-Gate-3-13-10-2024.jpg",title:"Baldur's Gate III",author:"Orangine", date:"13-10-2024", type:"retrato", wpp:"-"}
];