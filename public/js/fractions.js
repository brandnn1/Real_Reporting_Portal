var d_fractions = {

    "1001": { "id": 1001, "order": 1, "partyId": 1, "size": 297, "electionId": 1, "offset": 251 },
    "1002": { "id": 1002, "order": 0, "partyId": 2, "size": 241, "electionId": 1, "offset": 0 },

    "2001": { "id": 2001, "order": 1, "partyId": 1, "size": 448, "electionId": 2, "offset": 100 },
    "2002": { "id": 2002, "order": 0, "partyId": 2, "size": 90, "electionId": 2, "offset":  0},

    "3001": { "id": 3001, "order": 1, "partyId": 1, "size": 525, "electionId": 3, "offset": 23 },
    "3002": { "id": 3002, "order": 0, "partyId": 2, "size": 13, "electionId": 3, "offset": 0 },


    "4001": { "id": 4001, "order": 1, "partyId": 1, "size": 426, "electionId": 4, "offset": 122 },
    "4002": { "id": 4002, "order": 0, "partyId": 2, "size": 112, "electionId": 4, "offset": 0 },


    "5001": { "id": 5001, "order": 1, "partyId": 1, "size": 168, "electionId": 5, "offset": 380 },
    "5002": { "id": 5002, "order": 0, "partyId": 2, "size": 370, "electionId": 5, "offset": 0 },


    "6001": { "id": 6001, "order": 1, "partyId": 1, "size": 159, "electionId": 6, "offset": 389 },
    "6002": { "id": 6002, "order": 0, "partyId": 2, "size": 379, "electionId": 6, "offset": 0 },


    "7001": { "id": 7001, "order": 2, "partyId": 1, "size": 267, "electionId": 7, "offset": 280 },
    "7002": { "id": 7002, "order": 0, "partyId": 2, "size": 252, "electionId": 7, "offset": 0 },
    "7003": { "id": 7003, "order": 1, "partyId": 3, "size": 10, "electionId": 7, "offset": 260 },


    "8001": { "id": 8001, "order": 2, "partyId": 1, "size": 286, "electionId": 8, "offset": 262 },
    "8002": { "id": 8002, "order": 0, "partyId": 2, "size": 242, "electionId": 8, "offset": 0 },
    "8003": { "id": 8003, "order": 1, "partyId": 3, "size": 10, "electionId": 8, "offset": 247 },

    "9001": { "id": 9001, "order": 1, "partyId": 1, "size": 174, "electionId": 9, "offset": 374 },
    "9002": { "id": 9002, "order": 0, "partyId": 2, "size": 364, "electionId": 9, "offset": 0 },
    
    "10001": { "id": 10001, "order": 2, "partyId": 1, "size": 206, "electionId": 10, "offset": 342 },
    "10002": { "id": 10002, "order": 0, "partyId": 2, "size": 322, "electionId": 10, "offset": 0 },
    "10003": { "id": 10003, "order": 1, "partyId": 3, "size": 10, "electionId": 10, "offset": 327 },
    
    "11001": { "id": 11001, "order": 1, "partyId": 1, "size": 305, "electionId": 11, "offset": 243 },
    "11002": { "id": 11002, "order": 0, "partyId": 2, "size": 233, "electionId": 11, "offset": 0 },

}




var a_fractions = Object.keys(d_fractions).map(function(a) { return d_fractions[a]; });
a_fractions.reverse();