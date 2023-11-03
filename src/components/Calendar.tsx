import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import daLocale from '@fullcalendar/core/locales/da';
import listPlugin from '@fullcalendar/list';

type Props = {
  googleCalendarId: string;
};
export default function Calendar({ googleCalendarId }: Props) {
  return (
    <FullCalendar
      plugins={[ dayGridPlugin, googleCalendarPlugin, listPlugin ]}
      googleCalendarApiKey='AIzaSyBOhX-3VPGdJkhaX7IqD60Gh71V898AtcY'
      eventSources={[
        { googleCalendarId: googleCalendarId }
      ]}
      locales={[daLocale]}
      customButtons={
        {subscribeButton: {
          text: 'Abonner på kalender',
          click: function() {
            window.open(`https://calendar.google.com/calendar/u/0/r?cid=${ googleCalendarId }`, '_blank');
          },
          hint: "Abonner på kalenderen",
        }}
      }
      initialView='dayGridMonth'
      headerToolbar={{
        center: 'prev,today,next',
        right: 'subscribeButton'
      }}
      windowResize={function() {
        if (window.innerWidth < 767) {
          this.changeView('listWeek');
          this.setOption('headerToolbar', {
            left: '',
            center: 'title',
            right: ''
          });
          this.setOption('footerToolbar', {
            left:'prev,today,next',
            center:'',
            right:'subscribeButton'
          });
        } else {
          this.changeView('dayGridMonth');
          this.setOption('headerToolbar', {
            left: 'title',
            center: 'prev,today,next',
            right: 'subscribeButton'
          });
          this.setOption('footerToolbar', {
            left:'',
            center:'',
            right:''
          });
        }
      }}
      loading={function(loading) {
        if (!loading) {
          if (window.innerWidth < 767) {
            this.changeView('listWeek');
            this.setOption('headerToolbar', {
              left: '',
              center: 'title',
              right: ''
            });
            this.setOption('footerToolbar', {
              left:'prev,today,next',
              center:'',
              right:'subscribeButton'
            });
          } else {
            this.changeView('dayGridMonth');
            this.setOption('headerToolbar', {
              left: 'title',
              center: 'prev,today,next',
              right: 'subscribeButton'
            });
            this.setOption('footerToolbar', {
              left:'',
              center:'',
              right:''
            });
          }
        }
      }}
    />
  );
}
