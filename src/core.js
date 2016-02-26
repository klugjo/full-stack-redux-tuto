import {List, Map} from 'immutable';


export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

export function next(state) {
    const entries = state.get('entries');
    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
}

export function vote(state, entry) {
    return state.updateIn(
        ['vote', 'tally', entry], // path to property: vote.tally[entry]
        0, // default value if not set
        tally => tally + 1 // operation
    );
}