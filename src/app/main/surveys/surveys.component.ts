import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  displayedColumns = ['id', 'survey', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 users
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const survey =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    survey: survey,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}

/** Constants used to fill up our data base. */
const COLORS = ['green', 'red'];
const NAMES = ['PFIC_LOGOTEST_FWP', 'DE_YOUNG_NC1_RX', 'PFIC_LOGOTEST_PHARM', 'UTOPIAN_ECP', 'PFIC_RX', 'AQ_81043792_PHARM',
  'IPA_MR', 'NORMSKAD_RX', 'FEMRA_CNR', 'COLONY_G06_RX', 'IPA_MR', 'BTKI_PHARM',
  'DEFNE_RX', 'MIYABI_RX', 'CAMPAIGNS_ENDO', 'INDIGO_PHARM', 'BLANK_CANVAS_PHARM', 'SCARECROW_TRIPLEKIRVYR_RX', 'HARRISON_RX'];

export interface UserData {
  id: string;
  survey: string;
  progress: string;
  color: string;
}
