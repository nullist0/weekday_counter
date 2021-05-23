import { jest } from '@jest/globals';
import axios from 'axios';
import { format } from 'date-fns';
import { countWeekdayInRange } from '../adapter/date_fetcher';

// describe('count all day in a range', () => {
//     it('count 7 day in a week', () => {
//         // given
//         const startDate = new Date(2021, 4, 22);
//         const endDate = new Date(2021, 4, 28);
    
//         // when
//         const count = countAllDayInRange(startDate, endDate);
    
//         // then
//         expect(count).toBe(7);
//     });
    
//     it('count 1 day if a day is given', () => {
//         // given
//         const startDate = new Date(2021, 4, 22);
//         const endDate = new Date(2021, 4, 22);
    
//         // when
//         const count = countAllDayInRange(startDate, endDate);
    
//         // then
//         expect(count).toBe(1);
//     });
// });

describe('count weekday in a range', () => {
    const buildFakeResponse = (dates) => {
        if(dates.length === 0) {
            return {
                data:'<response>'+
                        '<body>'+
                            '<items/>' + 
                        '</body>'+
                    '</response>'
            };
        } else {
            return {
                data:'<response>'+
                        '<body>' +
                            '<items>' +
                                dates.map(date => `<item><locdate>${format(date, 'yyyyMMdd')}</locdate></item>`).join('') +
                            '</items>' +
                        '</body>' + 
                    '</response>'
            };
        }
    };
    
    it('given a non-holiday weekday, count 1 day', async () => {
        // given
        jest.spyOn(axios, 'get').mockResolvedValue(buildFakeResponse([]));
        const date = new Date(2021, 4, 21);
    
        // when
        const count = await countWeekdayInRange(date, date);
    
        // then
        expect(count).toBe(1);
    });

    it('given a weekend, count 0 day', async () => {
        // given
        jest.spyOn(axios, 'get').mockResolvedValue(buildFakeResponse([]));
        const date = new Date(2021, 4, 22);
    
        // when
        const count = await countWeekdayInRange(date, date);
    
        // then
        expect(count).toBe(0);
    });

    it('given a holiday, count 0 day', async () => {
        // given
        const date = new Date(2021, 4, 21);
        
        jest.spyOn(axios, 'get').mockResolvedValue(buildFakeResponse([date]));
        
        // when
        const count = await countWeekdayInRange(date, date);
    
        // then
        expect(count).toBe(0);
    });

    it('count 5 day if there is no weekday holiday in a given week', async () => {
        // given
        jest.spyOn(axios, 'get').mockResolvedValue(buildFakeResponse([new Date(2021, 4, 22), new Date(2021, 4, 23)]));
        const startDate = new Date(2021, 4, 17);
        const endDate = new Date(2021, 4, 23);
    
        // when
        const count = await countWeekdayInRange(startDate, endDate);
    
        // then
        expect(count).toBe(5);
    });
});