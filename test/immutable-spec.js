import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

    describe('a number', () => {

        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    describe('a List', () => {

        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }

        it('is immutable', () => {
            let state = List.of('Movie 1', 'Movie 2');
            let nextState = addMovie(state, 'Movie 3');

            expect(nextState).to.equal(List.of(
                'Movie 1',
                'Movie 2',
                'Movie 3'
            ));
            expect(state).to.equal(List.of(
                'Movie 1',
                'Movie 2'
            ));
        });
    });

    describe('a tree', () => {

        // tree format:
        // Map({movies: List.of('movie1', ...)})

        function addMovie(currentState, movie) {
            return currentState.update('movies', movies => movies.push(movie));
        }

        it('is immutable', () => {
            let state = Map({
                movies: List.of('Movie 1', 'Movie 2')
            });
            let nextState = addMovie(state, 'Movie 3');

            expect(nextState).to.equal(Map({
                movies: List.of(
                    'Movie 1',
                    'Movie 2',
                    'Movie 3'
                )
            }));

            expect(state).to.equal(Map({
                movies: List.of(
                    'Movie 1',
                    'Movie 2'
                )
            }));
        });
    });

});