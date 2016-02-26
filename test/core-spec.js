import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next} from '../src/core';

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
    });
});