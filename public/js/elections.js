var d_elections = {
    "1": { "id": 1, "number": "1976", "years": "1976 – 1980", "title": "Carter v. Ford" },
    "2": { "id": 2, "number": "1980", "years": "1980 – 1984", "title": "Carter v. Reagan" },
    "3": { "id": 3, "number": "1984", "years": "1984 – 1988", "title": "Mondale v. Reagan" },
    "4": { "id": 4, "number": "1988", "years": "1988 – 1992", "title": "Dukakis v. Bush" },
    "5": { "id": 5, "number": "1992", "years": "1992 – 1996", "title": "Clinton v. Bush" },
    "6": { "id": 6, "number": "1996", "years": "1996 – 2000", "title": "Clinton v. Dole" },
    "7": { "id": 7, "number": "2000", "years": "2000 – 2004", "title": "Dubya v. Gore" },
    "8": { "id": 8, "number": "2004", "years": "2004 - 2008", "title": "Dubya v. Kerry"},
    "9": { "id": 9, "number": "2008", "years": "2008 - 2012", "title": "Obama v. McCain" },
    "10": { "id": 10, "number": "2012", "years": "2012 - 2016", "title": "Obama v. Romney"},
    "11": { "id": 11, "number": "2016", "years": "2016 - 2020", "title": "Clinton v Trump"}
}

var a_elections = Object.keys(d_elections).map(function(a) { return d_elections[a]; });