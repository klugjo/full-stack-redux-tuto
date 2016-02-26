import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles SET_ENTRIES', () => {

        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Star Wars']};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Star Wars']
        }));
    });

    it('handles NEXT', () => {

        const initialState = fromJS({
            entries: ['Star Wars', 'Indiana Jones']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Star Wars', 'Indiana Jones']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {

        const initialState = fromJS({
            vote: {
                pair: ['Star Wars', 'Indiana Jones']
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'Indiana Jones'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Star Wars', 'Indiana Jones'],
                tally: {
                    'Indiana Jones': 1
                }
            },
            entries: []
        }));
    });

    it('has an initial state', () => {

        const action = {type: 'SET_ENTRIES', entries: ['Star Wars']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Star Wars']
        }));
    });
});