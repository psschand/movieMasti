import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { MovieDBService } from 'app/services/movie-db.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {

  yearsList: Number[];
  sortByList: any;
  genresList: any;
  options: any;
  itemList: any;

  constructor(private titleService: Title, public DBService: MovieDBService) {
    this.DBService.getGenres().subscribe((res: any) => this.genresList = res.genres);
    this.options = {};
    this.getDiscover();
    this.titleService.setTitle('Discover Tv Shows');
  }

  ngOnInit() {
    this.yearsList = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005,
      2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989,
      1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975];

    this.sortByList = [
      { key: 'popularity.desc', value: 'Popularity Descending' }, { key: 'popularity.asc', value: 'Popularity Ascending' },
      { key: 'vote_count.asc', value: 'Rating Ascending' }, { key: 'vote_count.desc', value: 'Rating Descending' },
      { key: 'primary_release_date.desc', value: 'Release Date Descending' },
      { key: 'primary_release_date.asc', value: 'Release Date Ascending' }
    ];
  }

  getDiscover() {
    this.DBService.getDiscover('tv', this.options).subscribe((res: any) => {
      const placeholderImg = 'http://via.placeholder.com/500x281?text=MovieMasti';
      this.itemList = res.results.map(item => {
        item.poster_path = item.poster_path ? `http://image.tmdb.org/t/p/w500/${item.poster_path}` : placeholderImg;
        item.backdrop_path = item.backdrop_path ? `http://image.tmdb.org/t/p/w500/${item.backdrop_path}` : placeholderImg;
        item.overview = item.overview.substr(0, 100) + '...';
        return item;
      });
    });
  }


}

