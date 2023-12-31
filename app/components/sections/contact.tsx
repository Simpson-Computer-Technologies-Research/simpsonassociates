"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { DEFAULT_CONTACT_EMAIL, DEFAULT_CONTACT_IMAGES } from "@/lib/constants";
import { ObjectState } from "@/lib/state";

/**
 * Contact Component
 * @returns JSX.Element
 */
interface ContactProps {
  image?: string;
  className?: string;
  emailTo?: string;
}
export default function Contact(props: ContactProps): JSX.Element {
  return (
    <section
      id="contact"
      className={cn(
        "group relative flex w-screen flex-col items-center justify-center p-10 pt-14",
        props.className,
      )}
    >
      <Header />
      <div className="flex h-full w-full flex-row items-center justify-center px-4">
        <ContactForm emailTo={props.emailTo || DEFAULT_CONTACT_EMAIL} />
        <Image
          src={
            props.image ||
            DEFAULT_CONTACT_IMAGES[
              Math.floor(Math.random() * DEFAULT_CONTACT_IMAGES.length)
            ]
          }
          alt="..."
          width={750}
          height={750}
          loading="eager"
          className="absolute -right-36 bottom-0 xxs:-right-44 xs:-right-60 sm:-right-72 md:-right-72 lg:-right-40"
        />
      </div>
    </section>
  );
}

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <header className="flex flex-col items-center justify-center text-center">
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Contact
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-1/2 sm:text-base">
      <i>Where do I start?</i> <i>What is a mortgage?</i>{" "}
      <i>What is refinancing?</i> <i>What is a fixed rate; variable rate?</i>{" "}
      <i>What is a pre-approval?</i> These are all questions we&rsquo;re more
      than happy to answer for you. We are here to help you through the mortgage
      process and make it as easy as possible for you.
    </p>
  </header>
);

/**
 * Contact Form Component
 * @returns JSX.Element
 */
interface ContactFields {
  name: string;
  phone: string;
  message: string;
}
const ContactForm = (props: { emailTo: string }): JSX.Element => {
  const errors = new ObjectState<ContactFields>({
    name: "",
    phone: "",
    message: "",
  });

  // Google session
  const { data: session } = useSession();

  // Return the component jsx
  return (
    <section className="z-[2] flex flex-col p-6 py-4 sm:bg-white/50 sm:backdrop-blur-sm lg:mr-40 xl:mr-0">
      <input
        disabled={true}
        className="w-60 border-b-[2.5px] border-b-primary bg-white p-2 text-xs text-primary xs:w-96 xs:text-sm sm:text-base"
        value={`To: ${props.emailTo}`}
      />

      {/* Name input */}
      <input
        id="contact-name"
        className="mt-4 w-60 border-b-[2.5px] border-primary p-2 text-xs text-primary focus:outline-none xs:w-96 xs:text-sm xs:focus:border-transparent xs:focus:ring-[2.5px] xs:focus:ring-primary sm:text-base"
        placeholder="Name"
        onChange={(e) => {
          if (!isValidName(e.target.value)) {
            errors.set({ ...errors.value, name: "Name is required" });
          } else if (errors.value.name) {
            errors.set({ ...errors.value, name: "" });
          }
        }}
      />
      <ErrorMessage error={errors.value.name} />

      {/* Phone number input */}
      <input
        id="contact-phone"
        className="mt-4 w-60 border-b-[2.5px] border-b-primary p-2 text-xs text-primary focus:outline-none xs:w-96 xs:text-sm xs:focus:border-transparent xs:focus:ring-[2.5px] xs:focus:ring-primary sm:text-base"
        placeholder="Phone Number (Not Required)"
        onChange={(e) => {
          if (!isValidPhone(e.target.value)) {
            errors.set({
              ...errors.value,
              phone: "Please enter a valid phone number",
            });
          } else if (errors.value.phone) {
            errors.set({ ...errors.value, phone: "" });
          }
        }}
      />
      <ErrorMessage error={errors.value.phone} />

      {/* Message input */}
      <textarea
        id="contact-message"
        placeholder="Message"
        className="mt-4 h-20 w-60 border-b-[2.5px] border-b-primary p-2 text-xs text-primary focus:outline-none xs:w-96 xs:text-sm xs:focus:border-transparent xs:focus:ring-[2.5px] xs:focus:ring-primary sm:text-base"
        onChange={(e) => {
          if (!isValidMessage(e.target.value)) {
            errors.set({ ...errors.value, message: "Message is required" });
          } else if (errors.value.message) {
            errors.set({ ...errors.value, message: "" });
          }
        }}
      ></textarea>
      <ErrorMessage error={errors.value.message} />

      {/* If the user is not logged in */}
      {!session && <SignInButton />}

      {/* If the user is logged in */}
      {session && session.user && session.user.email && (
        <SendEmailButton
          emailTo={props.emailTo}
          email={session.user.email}
          errors={errors}
        />
      )}
      {session && <ChangeEmailButton />}
    </section>
  );
};

/**
 * Error message component
 * @returns JSX.Element
 */
const ErrorMessage = (props: { error: string }): JSX.Element => (
  <p
    className={`mt-2 text-sm text-red-500 ${props.error ? "block" : "hidden"}`}
  >
    {props.error}
  </p>
);

/**
 * Sign in Button
 * @returns JSX.Element
 */
const SignInButton = (): JSX.Element => (
  <Link
    className="mt-2 flex w-60 flex-row items-center justify-center bg-white py-3 shadow-xl duration-500 ease-in-out hover:animate-pulse xs:w-96"
    href="/login"
    target="_blank"
    rel="noopener noreferrer"
  >
    <GoogleSvg />
    <p className="text-xs font-medium text-primary xs:text-sm sm:text-base">
      Sign in to send email
    </p>
  </Link>
);

/**
 * Change email button
 * @returns JSX.Element
 */
const ChangeEmailButton = (): JSX.Element => (
  <Link
    className="w-60 bg-primary p-2 text-center text-xs text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96 xs:text-sm sm:text-base"
    onClick={() => signOut({ redirect: false })}
    href="/login"
    target="_blank"
    rel="noopener noreferrer"
  >
    Change Email
  </Link>
);

/**
 * Send email button component
 * @returns JSX.Element
 */
interface SendEmailButtonProps {
  emailTo: string;
  email: string;
  errors: ObjectState<ContactFields>;
}
const SendEmailButton = (props: SendEmailButtonProps): JSX.Element => {
  const [sending, setSending] = React.useState<boolean>(false);

  // Send the email
  const sendEmail = async () => {
    const name = getElementValue("contact-name");
    const phone = getElementValue("contact-phone");
    const message = getElementValue("contact-message");

    if (!isValidName(name)) {
      return props.errors.set({
        ...props.errors.value,
        name: "Name is required",
      });
    }

    if (!isValidPhone(phone)) {
      return props.errors.set({
        ...props.errors.value,
        phone: "Invalid phone number",
      });
    }

    if (!isValidMessage(message)) {
      return props.errors.set({
        ...props.errors.value,
        message: "Message is required",
      });
    }

    const resp: string = await postEmail(
      props.emailTo,
      name,
      props.email,
      phone,
      message,
    );

    props.errors.set({ ...props.errors.value, message: resp });
  };

  return (
    <button
      className="my-2 w-60 bg-primary p-2 text-center text-xs text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96 xs:text-sm sm:text-base"
      onClick={() => {
        setSending(true);
        sendEmail().then(() => setSending(false));
      }}
    >
      {sending ? (
        "Sending"
      ) : (
        <p>
          Send Email as <br />{" "}
          <strong className="font-medium tracking-wide">{props.email}</strong>
        </p>
      )}
    </button>
  );
};

/**
 * Google Svg
 * @returns JSX.Element
 */
const GoogleSvg = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 186.69 190.5"
    className="mx-3 h-6 w-6 xs:h-7 xs:w-7"
  >
    <g transform="translate(1184.583 765.171)">
      <path
        clipPath="none"
        mask="none"
        d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
        fill="#4285f4"
      />
      <path
        clipPath="none"
        mask="none"
        d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
        fill="#34a853"
      />
      <path
        clipPath="none"
        mask="none"
        d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
        fill="#fbbc05"
      />
      <path
        d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
        fill="#ea4335"
        clipPath="none"
        mask="none"
      />
    </g>
  </svg>
);

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
 * Get an element value via id
 * @returns string
 */
const getElementValue = (id: string): string =>
  (document.getElementById(id) as HTMLInputElement).value;

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
 * @returns Promise<string>
 */
const postEmail = async (
  emailTo: string,
  name: string,
  email: string,
  phone: string,
  message: string,
): Promise<string> =>
  await fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_to: emailTo, name, email, phone, message }),
  })
    .then((res) => {
      if (res.ok) {
        clearFormValues();
        return "Email sent successfully";
      }
      return "Failed to send email";
    })
    .catch((_: Error) => "Failed to send email");
