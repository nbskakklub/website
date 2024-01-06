"use client";

import React, { Fragment, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import daLocale from "@fullcalendar/core/locales/da";
import listPlugin from "@fullcalendar/list";
import ModalOverflow from "@mui/joy/ModalOverflow";
import ModalDialog from "@mui/joy/ModalDialog";
import { Modal, ModalClose, Typography } from "@mui/joy";
import parse from "html-react-parser";

type Props = {
  googleCalendarId: string;
};
export default function Calendar({ googleCalendarId }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalLocation, setModalLocation] = useState("");
  const [modalStartDate, setModalStartDate] = useState(new Date());
  const [modalEndDate, setModalEndDate] = useState(new Date());

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <ModalOverflow>
          <ModalDialog
            layout="center"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <div>
              <ModalClose variant="plain" />
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                marginRight={3}
                mb={1}
              >
                {modalTitle}
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>
                {Intl.DateTimeFormat("da", {
                  dateStyle: "full",
                  timeStyle: "short",
                  timeZone: "Europe/Copenhagen",
                }).format(modalStartDate)}{" "}
                -{" "}
                {Intl.DateTimeFormat("da", {
                  dateStyle: "full",
                  timeStyle: "short",
                  timeZone: "Europe/Copenhagen",
                }).format(modalEndDate)}
              </Typography>
            </div>
            {modalLocation ? (
              <iframe
                width="100%"
                height="300"
                loading="lazy"
                src={
                  "https://www.google.com/maps/embed/v1/place?key=AIzaSyBOhX-3VPGdJkhaX7IqD60Gh71V898AtcY&q=" +
                  modalLocation
                }
              ></iframe>
            ) : null}
            <Typography id="modal-desc" textColor="inherit">
              {parse(modalContent || "")}
            </Typography>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin, listPlugin]}
        googleCalendarApiKey="AIzaSyBOhX-3VPGdJkhaX7IqD60Gh71V898AtcY"
        eventSources={[{ googleCalendarId: googleCalendarId }]}
        locales={[daLocale]}
        customButtons={{
          subscribeButton: {
            text: "Abonner på kalender",
            click: function () {
              window.open(
                `https://calendar.google.com/calendar/u/0/r?cid=${googleCalendarId}`,
                "_blank"
              );
            },
            hint: "Abonner på kalenderen",
          },
        }}
        initialView="listMonth"
        headerToolbar={{
          center: "prev,today,next",
          right: "subscribeButton",
        }}
        windowResize={function () {
          if (window.innerWidth < 767) {
            this.changeView("listMonth");
            this.setOption("headerToolbar", {
              left: "title",
              center: "",
              right: "",
            });
            this.setOption("footerToolbar", {
              left: "prev,today,next",
              center: "",
              right: "subscribeButton",
            });
          } else {
            this.changeView("listMonth");
            this.setOption("headerToolbar", {
              left: "title",
              center: "",
              right: "prev,today,next",
            });
            this.setOption("footerToolbar", {
              left: "subscribeButton",
              center: "",
              right: "dayGridMonth,listMonth",
            });
          }
        }}
        loading={function (loading) {
          if (!loading) {
            if (window.innerWidth < 767) {
              this.changeView("listMonth");
              this.setOption("headerToolbar", {
                left: "title",
                center: "",
                right: "",
              });
              this.setOption("footerToolbar", {
                left: "prev,today,next",
                center: "",
                right: "subscribeButton",
              });
            } else {
              this.changeView("dayGridMonth");
              this.setOption("headerToolbar", {
                left: "title",
                center: "",
                right: "prev,today,next",
              });
              this.setOption("footerToolbar", {
                left: "subscribeButton",
                center: "",
                right: "dayGridMonth,listMonth",
              });
            }
          }
        }}
        eventClick={function (info) {
          info.jsEvent.preventDefault();
          setModalContent(info.event.extendedProps.description);
          setModalTitle(info.event.title);
          setModalLocation(info.event.extendedProps.location);
          setModalStartDate(info.event.start);
          setModalEndDate(info.event.end);
          setModalOpen(true);
        }}
      />
    </>
  );
}
