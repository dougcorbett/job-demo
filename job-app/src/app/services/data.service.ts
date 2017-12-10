import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { IJob } from '../models/job.model';

@Injectable()
export class DataService {

  constructor() { }

  getJobs(): any[] {
    return JOBS;
  }

  getJob(id:number): any
  {
    for(let i = 0; i < JOBS.length; i++)
    {
      if(JOBS[i].id == id) { 
        return JOBS[i]; 
      }
    };
    return null;
  }

  removeJob(id:number)
  {
 
  }
}

const JOBS: IJob[] = [
  { 
    id: 1,
    position: "Graphic Designer",
    locationCity: "Charlotte",
    locationState: "NC",
    company: "Duke Energy",
    type: "Full Time",
    payRate: 54.00,
    payPeriod: "Hourly",
    description: 'Dapibus massa, sem elit varius penatibus accumsan luctus erat, dolor praesent eleifend quis, per lacus architecto non non, quis purus tincidunt. Ultrices rutrum duis interdum sit porttitor interdum, sodales porta lacus maecenas vel ut, lorem ac dui, tempor ipsum. Bibendum wisi mi adipiscing, consequat suspendisse vehicula lectus placerat fusce quis, ut adipiscing amet vestibulum, vitae vel. Morbi leo conubia elit nunc mauris, vehicula ut commodo sed et mattis fermentum, sit neque justo lorem purus, lectus vestibulum pede. Mattis a lectus, sit scelerisque elit diam, orci et sem bibendum neque, sed elit luctus hendrerit feugiat lorem lectus, pharetra odio eros nec mollis suspendisse est. Ullamcorper aliquam, amet diam. Erat amet ut, blandit non, ridiculus non sed.\nAliquet et erat porttitor commodo elit, vel cras odio, eos pharetra nec ut urna ut, maecenas eleifend magna ligula integer ac justo, ut et magna erat quisque. Amet massa nec dictum purus molestie vitae. Augue est orci et non, a lacus mollis velit consequat molestie. Justo integer nisl malesuada risus amet non, amet pharetra metus facilisi augue tincidunt velit, integer mattis. Nunc aliquet justo. Conubia sed consectetuer non tempor, commodo cras semper. Tincidunt magna tempus taciti mauris, consectetuer diam elementum. Velit ac a turpis elit praesent, magnis vestibulum ipsum varius, feugiat lorem turpis sed id.',
    postedDate: new Date(2017, 12, 1),
    owner: 1
  },
  { 
    id: 2,
    position: "Manager",
    locationCity: "Gastonia",
    locationState: "NC",
    company: "Seimens",
    type: "Full Time",
    payRate: 92000.00,
    payPeriod: "Annually",
    description: 'Lorem ipsum dolor sit amet, cursus tempus, suscipit tellus ut eros sollicitudin, ipsum justo tellus. Massa vel lacinia, inceptos venenatis, luctus ipsum donec et fusce suscipit lorem, tincidunt enim, luctus auctor ac massa diam. Id erat nulla duis vestibulum, diam quo id arcu at duis, quis sed proin et mi, condimentum ante magna, posuere ultricies vel pharetra risus mi pede. Vel ultrices ullamcorper magna elementum nullam primis, phasellus ornare wisi. Praesent nec luctus sed cursus urna, sed donec, eget odio rhoncus erat orci proin, eu lorem nonummy vivamus non, sodales nunc. Ultricies justo cursus vel, wisi eu condimentum luctus, aenean facilisis ut feugiat sit ultricies, sed vel elit nisl, turpis aliquam wisi turpis. Fermentum proin consectetuer natoque mi, ut at justo metus pede amet, commodo donec velit turpis, urna quis lacus in est euismod. Elit posuere, purus id eleifend, pellentesque condimentum, in morbi nec turpis ac neque etiam. Eget pede vitae eget class magna sem, dolorem at consectetuer phasellus, sed erat porttitor ac. Vestibulum vivamus. Ullamcorper luctus amet, qui turpis ac vivamus risus feugiat eros, non integer neque nullam fusce nec euismod, tempor curabitur pede nulla magna at posuere, id amet erat velit malesuada at. Sit tellus velit semper nec ut, felis nisl ut pharetra ullamcorper justo, luctus tellus aliquet maecenas faucibus vel vitae.',
    postedDate: new Date(2017, 12, 2),
    owner: 1
  },
  { 
    id: 3,
    position: "Intern Developer",
    locationCity: "Charlotte",
    locationState: "NC",
    company: "Bank of America",
    type: "Part Time",
    payRate: 35.00,
    payPeriod: "Hourly",
    description: 'Aliquet et erat porttitor commodo elit, vel cras odio, eos pharetra nec ut urna ut, maecenas eleifend magna ligula integer ac justo, ut et magna erat quisque. Amet massa nec dictum purus molestie vitae. Augue est orci et non, a lacus mollis velit consequat molestie. Justo integer nisl malesuada risus amet non, amet pharetra metus facilisi augue tincidunt velit, integer mattis. Nunc aliquet justo. Conubia sed consectetuer non tempor, commodo cras semper. Tincidunt magna tempus taciti mauris, consectetuer diam elementum. Velit ac a turpis elit praesent, magnis vestibulum ipsum varius, feugiat lorem turpis sed id.\nVivamus pede vulputate lacus iaculis, nulla nulla ligula gravida, luctus tincidunt habitant blandit, fermentum elit tellus. Massa sit luctus et mauris leo, nascetur tristique sit vivamus scelerisque, nulla arcu nonummy, amet nam imperdiet consequatur, a velit cras justo nam enim eu. Sed mi fusce, vestibulum magna est ridiculus quisque. Sit vestibulum nunc nec nascetur in nunc, nisl vestibulum lectus aenean. Et condimentum ut at neque enim, accumsan fringilla pretium eget sed. Adipiscing massa et. Nunc nisl consequat blandit. Gravida curabitur orci, inceptos nulla neque, torquent pellentesque tincidunt eget, pellentesque nisl. Dolor magnis, ultricies quis, leo dui odio primis pharetra, nec est, hendrerit purus vestibulum libero. Porttitor risus nec. Ridiculus lobortis eu suspendisse, est enim litora.',
    postedDate: new Date(2017, 12, 3),
    owner: 1
  },
  { 
    id: 4,
    position: "Physical Therapist",
    locationCity: "Fort Mill",
    locationState: "SC",
    company: "Duke Energy",
    type: "Full Time",
    payRate: 69000.00,
    payPeriod: "Annually",
    description: 'Lorem ipsum dolor sit amet, adipiscing posuere amet vehicula vestibulum, pede luctus elementum lorem, tempora consequat facilisi tincidunt arcu. Adipiscing per non odio, at a quis dolor, molestie diam sed vehicula cras. Maecenas quam at lorem, vel quam mi vestibulum fermentum, lacus urna laoreet et tempora. Sit in enim mattis lorem, tristique suspendisse enim nibh, proin tempor vitae a. Suspendisse sed velit lorem, leo neque posuere vel eget. Consequat nam felis semper, eget cursus dictum faucibus, wisi sit feugiat nonummy.\nTincidunt amet ultrices elit sunt, gravida diam eget eros ante. Est molestie augue erat vivamus, adipiscing urna luctus sit venenatis, ut sed a leo, felis pellentesque sapien augue. Varius sed soluta sit vestibulum, egestas eget et sit, elementum velit justo sit et, donec integer pharetra erat. Tempor leo et eget sapien, quis amet lorem amet. Placerat habitant gravida erat, praesent adipiscing fringilla lectus, non orci vitae sodales, leo potenti sodales in nulla.',
    postedDate: new Date(2017, 12, 4),
    owner: 1
  },
  { 
    id: 5,
    position: "Scrum Master",
    locationCity: "Charlotte",
    locationState: "NC",
    company: "Wells Fargo",
    type: "Full Time",
    payRate: 89000.00,
    payPeriod: "Annually",
    description: 'Orci sit ullamcorper nulla, ante in parturient rhoncus nullam. Eu nisl morbi neque felis, aenean pretium mi eu curabitur, tellus ante interdum dui vehicula, fringilla nascetur lorem sit. Aliquet sed felis magna, arcu suspendisse sit quam est, felis aenean a urna eget. In at tristique adipiscing diam, augue ipsum felis orci. Praesent pharetra a dolor hac, pulvinar a scelerisque semper lobortis, venenatis integer aliquet dolor massa, proin tristique integer parturient. Id morbi nam felis, a a et praesent voluptate, etiam fringilla est doloribus.\nLaoreet sed non hymenaeos, molestie taciti velit vel, hendrerit massa convallis nunc. Tortor fermentum sed ultricies, sed placeat aenean viverra, wisi et suspendisse gravida, porttitor purus rerum amet. Consequat ipsum elit nulla, vestibulum ligula nonummy facilisis. Massa voluptate eu ligula, etiam erat consequat hac dapibus. Laoreet aliquet et scelerisque malesuada, lorem eros ipsum inceptos cras.',
    postedDate: new Date(2017, 12, 8),
    owner: 1
  }
];