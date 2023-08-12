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
      className="group relative bg-slate-50 flex w-full flex-col p-10 sm:py-16 pt-14 sm:pt-20 text-center"
    >
      <Header />
      <div className="flex h-full w-full flex-row items-center justify-center">
        <ContactForm />
        <Image
          src="/images/happy_couple_contact.png"
          alt="..."
          width={500}
          height={500}
          className="absolute -right-40 bottom-0 z-10 lg:-right-20 xl:right-0"
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
    <section className="backdrop-blur-sm p-6 bg-white/50 mt-4 flex flex-col items-center justify-center xs:mt-6 md:mt-6 lg:mr-40 lg:mt-10 xl:mr-0 z-20 relative">
      {/* Name input */}
      <div className="mb-4 flex flex-col items-start justify-start">
        <input
          id="contact-name"
          className="w-60 text-xs xs:text-sm sm:text-base border-primary border-b-[2.5px] p-2 focus:border-transparent focus:outline-none focus:ring-[2.5px] focus:ring-primary xs:w-96"
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
          className={`mt-2 text-sm text-red-500 ${
            nameError ? "block" : "hidden"
          }`}
        >
          {nameError}
        </p>
      </div>

      {/* Phone number input */}
      <div className="mb-4 flex flex-col items-start justify-start">
        <input
          id="contact-phone"
          className="w-60 text-xs xs:text-sm sm:text-base border-b-[2.5px] border-b-primary p-2 focus:border-transparent focus:outline-none focus:ring-[2.5px] focus:ring-primary xs:w-96"
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
      <div className="mb-4 flex flex-col items-start justify-start">
        <textarea
          id="contact-message"
          placeholder="Message"
          className="h-20 w-60 text-xs xs:text-sm sm:text-base border-b-[2.5px] border-b-primary p-2 text-gray-800 focus:border-transparent focus:outline-none focus:ring-[2.5px] focus:ring-primary xs:w-96"
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
 * Get an element value via id
 */
const getElementValue = (id: string): string =>
  (document.getElementById(id) as HTMLInputElement).value;

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
    const name = getElementValue("contact-name");
    const phone = getElementValue("contact-phone");
    const message = getElementValue("contact-message");

    // Make sure the values are valid
    if (!isValidName(name)) {
      return props.setNameError("Name is required");
    }
    if (!isValidPhone(phone)) {
      return props.setPhoneError("Please enter a valid phone number");
    }
    if (!isValidMessage(message)) {
      return props.setMessageError("Message is required");
    }

    // Post the email
    await postEmail(
      name,
      email,
      phone,
      message,
      sendEmailError,
      setSendEmailError
    );
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
          className="mb-2 mt-2 w-60 bg-white shadow-xl items-center justify-center flex flex-row py-3 duration-500 ease-in-out xs:w-96 hover:animate-pulse"
          href="/contact/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GoogleSvg />
          <p className="font-medium text-gray-500/80 text-xs xs:text-sm sm:text-base">
            Sign in to send email
          </p>
        </Link>
      )}

      {/* If the user is logged in */}
      {session && (
        <button
          className="mb-2 mt-2 w-60 text-xs xs:text-sm sm:text-base bg-primary p-2 text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96"
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
          className="w-60 text-xs xs:text-sm sm:text-base bg-primary p-2 text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96"
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

/**
 * Is valid phone number
 * @return bool
 */
const isValidPhone = (phone: string): boolean => /^[0-9- ]*$/.test(phone);

/**
 * Is valid message
 * @return bool
 */
const isValidMessage = (message: string): boolean => message.length > 2;

/**
 * Is valid name
 * @return bool
 */
const isValidName = (name: string): boolean => name.length > 2;

/**
 * Post the email to the api
 */
const postEmail = async (
  name: string,
  email: string,
  phone: string,
  message: string,
  sendEmailError: string,
  setSendEmailError: React.Dispatch<React.SetStateAction<string>>
) => {
  // Send the email using the api
  await fetch("/api/contact/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, phone, message }),
  }).then((res) =>
    res.status === 200
      ? () => {
          if (sendEmailError) setSendEmailError("");
          clearFormValues();
        }
      : setSendEmailError("Failed to send email")
  );
};

/**
 * Clear the form values
 * @return void
 */
const clearFormValues = (): void => {
  (document.getElementById("contact-name") as HTMLInputElement).value = "";
  (document.getElementById("contact-phone") as HTMLInputElement).value = "";
  (document.getElementById("contact-message") as HTMLInputElement).value = "";
};

/**
 * Google Svg
 */
const GoogleSvg = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 186.69 190.5"
    className="mx-3 h-6 w-6 xs:w-7 xs:h-7"
  >
    <g transform="translate(1184.583 765.171)">
      <path
        clip-path="none"
        mask="none"
        d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
        fill="#4285f4"
      />
      <path
        clip-path="none"
        mask="none"
        d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
        fill="#34a853"
      />
      <path
        clip-path="none"
        mask="none"
        d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
        fill="#fbbc05"
      />
      <path
        d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
        fill="#ea4335"
        clip-path="none"
        mask="none"
      />
    </g>
  </svg>
);
