import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

    describe('setEntries', () => {

        it('adds the entries to the state', () => {

            const state = Map();
            const entries = List.of('Sonatine', 'Hana Bi');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Sonatine', 'Hana Bi')
            }));
        });

        it('converts to immutable', () => {

            const state = Map();
            const entries = ['Sonatine', 'Hana Bi'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Sonatine', 'Hana Bi')
            }));
        });
    });

    describe('next', () => {

        it('takes the next tow entries under vote', () => {

            const state = Map({
                entries: List.of('Sonatine', 'Hana Bi', 'Zatoichi')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sonatine', 'Hana Bi')
                }),
                entries: List.of('Zatoichi')
            }))
        });

        it('puts the winner of current vote back to entries', () => {

            const state = Map({
                vote: Map({
                    pair: List.of('Sonatine', 'Hana Bi'),
                    tally: Map({
                        'Sonatine': 4,
                        'Hana Bi': 3
                    })
                }),
                entries: List.of('Zatoichi', 'Dolls', 'Battle Royale')
            });

            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Zatoichi', 'Dolls')
                }),
                entries: List.of('Battle Royale', 'Sonatine')
            }));
        });

        it('puts both back in case of a tied vote', () => {

            const state = Map({
                vote: Map({
                    pair: List.of('Sonatine', 'Hana Bi'),
                    tally: Map({
                        'Sonatine': 4,
                        'Hana Bi': 4
                    })
                }),
                entries: List.of('Zatoichi', 'Dolls', 'Battle Royale')
            });

            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Zatoichi', 'Dolls')
                }),
                entries: List.of('Battle Royale', 'Sonatine', 'Hana Bi')
            }));
        });

        it('marks winner when just one entry left', () => {

            const state = Map({
                vote: Map({
                    pair: List.of('Sonatine', 'Battle Royale'),
                    tally: Map({
                        'Sonatine': 4,
                        'Battle Royale': 3
                    })
                }),
                entries: List()
            });

            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'Sonatine'
            }));
        });
    });

    describe('vote', () => {

        it('creates a tally for the voted entry', () => {

            const state = Map({
                vote: Map({
                    pair: List.of('Sonatine', 'Hana Bi')
                }),
                entries: List.of('Zatoichi')
            });

            const nextState = vote(state, 'Sonatine');

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sonatine', 'Hana Bi'),
                    tally: Map({
                        'Sonatine': 1
                    })
                }),
                entries: List.of('Zatoichi')
            }));
        });

        it('adds to existing tally', () => {

            const state = Map({
                vote: Map({
                    pair: List.of('Sonatine', 'Hana Bi'),
                    tally: Map({
                        'Sonatine': 4,
                        'Hana Bi': 3
                    })
                }),
                entries: List.of('Zatoichi')
            });

            const nextState = vote(state, 'Hana Bi');

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sonatine', 'Hana Bi'),
                    tally: Map({
                        'Sonatine': 4,
                        'Hana Bi': 4
                    })
                }),
                entries: List.of('Zatoichi')
            }));
        });
    });
});