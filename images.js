const images=[
    /* em branco
    {thumb:"-",src:"-",title:"-",author:"Orangine", date:"-", type:"-", wpp:"-"}
    */ /* #0000 */

    /* Jujuba */
    /* #0001 */ {thumb:"https://i.ibb.co/7Sc4dnq/01-Elden-Ring-01-02-2024.jpg",src:"https://i.ibb.co/W5F5kxZ/01-Elden-Ring-01-02-2024.jpg",title:"Elden Ring",author:"Jujuba", date:"26-07-2024", type:"paisagem", wpp:"-"},
    /* #0002 */ {thumb:"https://i.ibb.co/TP8MG73/02-Horizon-Zero-Dawn-13-09-2024.jpg",src:"https://i.ibb.co/KbsK1pz/02-Horizon-Zero-Dawn-13-09-2024.jpg",title:"Horizon Zero Dawn",author:"Jujuba", date:"13-09-2024", type:"paisagem", wpp:"-"},
    /* #0003 */ {thumb:"https://i.ibb.co/7Q3hZh6/03-Elden-Ring-21-08-2024.jpg",src:"https://i.ibb.co/FgggS1Z/03-Elden-Ring-21-08-2024.jpg",title:"Elden Ring",author:"Jujuba", date:"21-08-2024", type:"paisagem", wpp:"-"},

    /* Orangine */
    /* #0001 */ {thumb:"https://i.ibb.co/MfZPfwm/001-Life-is-Strange-True-Colors-21-05-2022.jpg",src:"https://i.ibb.co/xj5WSrf/001-Life-is-Strange-True-Colors-21-05-2022.jpg",title:"Life is Strange: True Colors",author:"Orangine", date:"21-05-2022", type:"paisagem", wpp:"-"},
    /* #0002 */ {thumb:"https://i.ibb.co/YR9nk5f/002-Red-Dead-Redemption-2-06-03-2023.jpg",src:"https://i.ibb.co/T1RPMfH/002-Red-Dead-Redemption-2-06-03-2023.jpg",title:"Red Dead Redemption 2",author:"Orangine", date:"06-03-2023", type:"paisagem", wpp:"-"},
    /* #0003 */ {thumb:"https://i.ibb.co/M7yJGR4/003-Baldur-s-Gate-3-09-05-2024.jpg",src:"https://i.ibb.co/Ksyd9cR/003-Baldur-s-Gate-3-09-05-2024.jpg",title:"Baldur's Gate III",author:"Orangine", date:"09-05-2024", type:"retrato", wpp:"-"},
    /* #0004 */ {thumb:"https://i.ibb.co/XzSf82z/004-Deep-Rock-Galactic-19-06-2024.jpg",src:"https://i.ibb.co/pyBjpvR/004-Deep-Rock-Galactic-19-06-2024.jpg",title:"Deep Rock Galactic",author:"Orangine", date:"19-06-2024", type:"paisagem", wpp:"-"},
    /* #0005 */ {thumb:"https://i.ibb.co/7Vh2h3b/005-The-First-Descendant-15-07-2024.jpg",src:"https://i.ibb.co/Ssynpw2/005-The-First-Descendant-15-07-2024.jpg",title:"The First Descendant",author:"Orangine", date:"15-07-2024", type:"paisagem", wpp:"-"},
    /* #0006 */ {thumb:"https://i.ibb.co/02y5Gvn/006-Remnant-II-21-07-2024.jpg",src:"https://i.ibb.co/z84kmq4/006-Remnant-II-21-07-2024.jpg",title:"Remnant 2",author:"Orangine", date:"21-07-2024", type:"paisagem", wpp:"-"},
    /* #0007 */ {thumb:"https://i.ibb.co/r43vMCh/007-Elden-Ring-26-07-2024.jpg",src:"https://i.ibb.co/QF19grV/007-Elden-Ring-26-07-2024.jpg",title:"Elden Ring",author:"Orangine", date:"26-07-2024", type:"paisagem", wpp:"-"},
    /* #0008 */ {thumb:"https://i.ibb.co/26gZDKw/008-Elden-Ring-26-07-2024.jpg",src:"https://i.ibb.co/17Wpn98/008-Elden-Ring-26-07-2024.jpg",title:"Elden Ring",author:"Orangine", date:"26-07-2024", type:"retrato", wpp:"-"},
    /* #0009 */ {thumb:"https://i.ibb.co/BsF6QQf/009-Elden-Ring-26-07-2024.jpg",src:"https://i.ibb.co/Lr9Q9Pc/009-Elden-Ring-26-07-2024.jpg",title:"Elden Ring",author:"Orangine", date:"26-07-2024", type:"retrato", wpp:"-"},
    /* #0010 */ {thumb:"https://i.ibb.co/sQy4n2f/010-Elden-Ring-27-07-2024.jpg",src:"https://i.ibb.co/XVDXrm5/010-Elden-Ring-27-07-2024.jpg",title:"Elden Ring",author:"Orangine", date:"27-07-2024", type:"paisagem", wpp:"-"},
    /* #0011 */ {thumb:"https://i.ibb.co/dckNpHN/011-Elden-Ring-01-08-2024.jpg",src:"https://i.ibb.co/p4mJLdN/011-Elden-Ring-01-08-2024.jpg",title:"Elden Ring",author:"Orangine", date:"01-08-2024", type:"retrato", wpp:"-"},
    /* #0012 */ {thumb:"https://i.ibb.co/rfFTwDN/012-Elden-Ring-03-08-2024.jpg",src:"https://i.ibb.co/d0JVpXx/012-Elden-Ring-03-08-2024.jpg",title:"Elden Ring",author:"Orangine", date:"03-08-2024", type:"paisagem", wpp:"-"},
    /* #0013 */ {thumb:"https://i.ibb.co/ZTxXrky/013-Baldur-s-Gate-3-25-08-2024.jpg",src:"https://i.ibb.co/PhDzpPG/013-Baldur-s-Gate-3-25-08-2024.jpg",title:"Baldur's Gate III",author:"Orangine", date:"25-08-2024", type:"paisagem", wpp:"-"},
    /* #0014 */ {thumb:"https://i.ibb.co/rsc7wD0/014-Baldur-s-Gate-3-02-09-2024.jpg",src:"https://i.ibb.co/Fb2kBGd/014-Baldur-s-Gate-3-02-09-2024.jpg",title:"Baldur's Gate III",author:"Orangine", date:"02-09-2024", type:"retrato", wpp:"-"},
    /* #0015 */ {thumb:"https://i.ibb.co/m9qzLbM/015-Baldur-s-Gate-3-28-08-2024.jpg",src:"https://i.ibb.co/GFfXR7R/015-Baldur-s-Gate-3-28-08-2024.jpg",title:"Baldur's Gate III",author:"Orangine", date:"28-08-2024", type:"paisagem", wpp:"-"},
    /* #0016 */ {thumb:"https://i.ibb.co/M7Fwh91/016-STAR-WARS-Jedi-Survivor-16-09-2024.jpg",src:"https://i.ibb.co/h7Cr15t/016-STAR-WARS-Jedi-Survivor-16-09-2024.jpg",title:"Star Wars Jedi: Survivor",author:"Orangine", date:"16-09-2024", type:"paisagem", wpp:"-"},
    /* #0017 */ {thumb:"https://i.ibb.co/PxSpRbQ/017-STAR-WARS-Jedi-Survivor-18-09-2024.jpg",src:"https://i.ibb.co/DDNvVrt/017-STAR-WARS-Jedi-Survivor-18-09-2024.jpg",title:"Star Wars Jedi: Survivor",author:"Orangine", date:"18-09-2024", type:"paisagem", wpp:"-"},
    /* #0018 */ {thumb:"https://i.ibb.co/q5w6HSq/018-Borderlands-2-02-10-2024.jpg",src:"https://i.ibb.co/xqkhwFQ/018-Borderlands-2-02-10-2024.jpg",title:"Borderlands 2",author:"Orangine", date:"02-10-2024", type:"retrato", wpp:"-"},
    /* #0019 */ {thumb:"https://i.ibb.co/LYBHZH1/019-Borderlands-3-07-10-2024.jpg",src:"https://i.ibb.co/nqG65Mx/019-Borderlands-3-07-10-2024.jpg",title:"Borderlands 3",author:"Orangine", date:"07-10-2024", type:"retrato", wpp:"-"},
    /* #0020 */ {thumb:"https://i.ibb.co/7zm0Htc/20-Baldur-s-Gate-3-13-10-2024.jpg",src:"https://i.ibb.co/zXWNLsL/20-Baldur-s-Gate-3-13-10-2024.jpg",title:"Baldur's Gate III",author:"Orangine", date:"13-10-2024", type:"paisagem", wpp:"-"}
];
