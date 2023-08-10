"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { signOut, useSession } from "next-auth/react";

/**
 * Contact Component
 * @returns JSX.Element
 */
export default function Contact(): JSX.Element {
  return (
    <section
      id="contact"
      className="group relative flex w-full flex-col p-10 py-16 pt-20 text-center"
    >
      <Header />
      <div className="flex h-full w-full flex-row items-center justify-center">
        <ContactForm />
        <Image
          src="/images/happy_couple_contact.png"
          alt="Happy couple"
          width={500}
          height={500}
          className="absolute -right-40 bottom-0 -z-10 lg:-right-20 xl:right-0"
        />
      </div>
    </section>
  );
}

/**
 * Contact Form Component
 * @returns JSX.Element
 */
const ContactForm = (): JSX.Element => {
  // Keep track of errors
  const [nameError, setNameError] = React.useState<string>("");
  const [phoneError, setPhoneError] = React.useState<string>("");
  const [messageError, setMessageError] = React.useState<string>("");

  // Return the component jsx
  return (
    <section className="mt-4 flex flex-col items-center justify-center xs:mt-14 md:mt-6 lg:mr-40 lg:mt-10 xl:mr-0">
      {/* Name input */}
      <div className="mb-2 flex flex-col items-start justify-start">
        <input
          id="contact-name"
          className="w-60 rounded-md border-2 border-gray-300 p-2 text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-secondary xs:w-96"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            if (e.target.value.length < 2) {
              setNameError("Name is required");
            } else if (nameError) {
              setNameError("");
            }
          }}
        />
        <p
          className={`ml-2 mt-2 text-sm text-red-500 ${
            nameError ? "block" : "hidden"
          }`}
        >
          {nameError}
        </p>
      </div>

      {/* Phone number input */}
      <div className="mb-2 flex flex-col items-start justify-start">
        <input
          id="contact-phone"
          className="w-60 rounded-md border-2 border-gray-300 p-2 text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-secondary xs:w-96"
          type="text"
          placeholder="Phone Number"
          onChange={(e) => {
            if (!/^[0-9- ]*$/.test(e.target.value)) {
              setPhoneError("Please enter a valid phone number");
            } else if (phoneError) {
              setPhoneError("");
            }
          }}
        />
        <p
          className={`ml-2 mt-2 text-sm text-red-500 ${
            phoneError ? "block" : "hidden"
          }`}
        >
          {phoneError}
        </p>
      </div>

      {/* Message input */}
      <div className="mb-2 flex flex-col items-start justify-start">
        <textarea
          id="contact-message"
          className="h-20 w-60 rounded-md border-2 border-gray-300 p-2 text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-secondary xs:w-96"
          placeholder="Message"
          onChange={(e) => {
            if (e.target.value.length < 2) {
              setMessageError("Message is required");
            } else if (messageError) {
              setMessageError("");
            }
          }}
        ></textarea>
        <p
          className={`ml-2 mt-2 text-sm text-red-500 ${
            messageError ? "block" : "hidden"
          }`}
        >
          {messageError}
        </p>
      </div>
      <SubmitButtons {...{ setNameError, setPhoneError, setMessageError }} />
    </section>
  );
};

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <div className="flex flex-col items-center justify-center">
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Contact
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-1/2 sm:text-base">
      <i>Where do I start?</i> <i>What is a mortgage?</i>{" "}
      <i>What is refinancing?</i> <i>What is a fixed rate?</i>{" "}
      <i>What is a variable rate?</i> <i>What is a pre-approval?</i> These are
      all questions we&rsquo;re more than happy to answer for you. We are here
      to help you through the mortgage process and make it as easy as possible
      for you.
    </p>
  </div>
);

/**
 * Submit Button Component
 * @param {string} props.className
 * @param {string} props.text
 * @returns JSX.Element
 */
function SubmitButtons(props: {
  setNameError: React.Dispatch<React.SetStateAction<string>>;
  setPhoneError: React.Dispatch<React.SetStateAction<string>>;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  // Google session
  const { data: session } = useSession();

  // Manage email and sending states
  const [sendEmailError, setSendEmailError] = React.useState<string>("");
  const [sending, setSending] = React.useState<boolean>(false);

  /**
   * Send an email
   * @param {string} email
   */
  const sendEmail = async (email: string) => {
    // Get the form values
    const name = (document.getElementById("contact-name") as HTMLInputElement)
      .value;
    const phone = (document.getElementById("contact-phone") as HTMLInputElement)
      .value;
    const message = (
      document.getElementById("contact-message") as HTMLInputElement
    ).value;

    // Make sure the values are valid
    if (name.length < 2) {
      props.setNameError("Name is required");
      return;
    }
    if (!/^[0-9- ]*$/.test(phone)) {
      props.setPhoneError("Please enter a valid phone number");
      return;
    }
    if (message.length < 2) {
      props.setMessageError("Message is required");
      return;
    }

    // Send the email using the api
    await fetch("/api/contact/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, message }),
    }).then((res) => {
      // If the email was sent successfully
      if (res.status === 200) {
        if (sendEmailError) setSendEmailError("");
        (document.getElementById("contact-name") as HTMLInputElement).value =
          "";
        (document.getElementById("contact-phone") as HTMLInputElement).value =
          "";
        (document.getElementById("contact-message") as HTMLInputElement).value =
          "";
      } else {
        setSendEmailError("Failed to send email");
      }
    });
  };

  /**
   * Check the session and send the email
   * @param {Session} session
   */
  const checkSessionAndSendEmail = async (session: any) => {
    if (session && session.user && session.user.email)
      await sendEmail(session.user.email);
  };

  /**
   * Open the login window
   */
  /*
  const openLoginWindow = () => {
    const wnd = window.open("/contact/login", "_blank", "width=500,height=500");
    if (!wnd) return;
    wnd.focus();
    let interval = window.setInterval(async () => {
      if (wnd.closed) {
        clearInterval(interval);
        await update(session);
      }
    }, 100);
  };*/

  // Return the component jsx
  return (
    <div className="flex flex-col">
      {/* If there is an error sending the email */}
      {sendEmailError && <p className="mb-4 text-red-500">{sendEmailError}</p>}

      {/* If the user is not logged in */}
      {!session && (
        <Link
          className="mb-2 w-60 rounded-md bg-tertiary p-2 text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96"
          href="/contact/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign in to send email
        </Link>
      )}

      {/* If the user is logged in */}
      {session && (
        <button
          className="mb-2 w-60 rounded-md bg-tertiary p-2 text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96"
          onClick={() => {
            setSending(true);
            checkSessionAndSendEmail(session).then(() => setSending(false));
          }}
        >
          {sending ? (
            "Sending"
          ) : (
            <span>
              Send Email as <br />{" "}
              <strong className="font-semibold tracking-wide">
                {session && session.user && session.user.email}
              </strong>
            </span>
          )}
        </button>
      )}

      {/* If the user is logged in */}
      {session && (
        <Link
          className="w-60 rounded-md bg-tertiary p-2 text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96"
          onClick={() => signOut({ redirect: false })}
          href="/contact/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          Change Email
        </Link>
      )}
    </div>
  );
}
