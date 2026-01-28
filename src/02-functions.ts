import {Friend, Colleague, EmailContact } from './myTypes';
import { colleagues, friends } from './01-basics';

function older(f: Friend) : string {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

function allOlder(friends: Friend[]) : string[] {
    return friends.map( f => {
        f.age += 1
        return `${f.name} is now ${f.age}` 
    });
}

console.log(older(friends[0]));
console.log(allOlder(friends));

function highestExtension(cs: Colleague[]) {
  const result = cs.sort(
    (c1, c2) => c1.contact.extension - c2.contact.extension
  );
  return result[cs.length - 1];
}
console.log(highestExtension(colleagues.current));

function addColleague(cs: Colleague[], name: string, department: string, email: string): void {
    const extension = highestExtension(cs).contact.extension + 1;
    const newColleague: Colleague = {
        name,
        department,
        contact: {
        email,
        extension
        }
    };
    cs.push(newColleague);
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));


function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,
  max? : number
): EmailContact[] {
  let end = colleagues.length;
  if (max !== undefined) {
     end = max < 2 ? 1 : max
  }
  const sorted = colleagues.sort(sorter);
  const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return fullResult.slice(0,end)
}
// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW

function findFriends(
  friends: Friend[],
  finder: (f1: Friend) => boolean
): string[] {
  const found: Friend[] = friends.filter(finder);
  const result: string[] = found.map(f => f.name);
  return result;
}

console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));

function addInterest(f: Friend, interest: string): string[] {
    f.interests = f.interests ? [...f.interests, interest] : [interest];
    return f.interests;
}

console.log(addInterest(friends[0], 'Politics'))