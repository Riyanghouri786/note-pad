import React from "react";

const AboutPage = () => {
  return (
    <div className="h-full bg-base-200 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary sm:text-5xl md:text-5xl lg:text-6xl">
        About Notepad
      </h1>
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-base-content mb-4 sm:text-xl md:text-2xl">
          Welcome to Notepad! We provide a secure and easy-to-use platform where
          you can store your personal notes.
        </p>
        <p className="text-lg text-base-content mb-4 sm:text-xl md:text-2xl">
          With Notepad, you can keep your notes safe and encrypted in our cloud
          storage, ensuring that your data is only accessible by you. Whether
          you're on your phone, tablet, or computer, your notes are always just
          a few clicks away.
        </p>
        <p className="text-lg text-base-content mb-4 sm:text-xl md:text-2xl">
          Our goal is to offer a reliable and user-friendly note-taking
          experience. You can write, store, and access your notes anywhere,
          anytime, with complete peace of mind.
        </p>
        <p className="text-lg text-base-content sm:text-xl md:text-2xl">
          We're committed to keeping your data private and secure. Your notes
          are stored with end-to-end encryption, and you can easily access them
          from any device that you sign into. Start storing your notes with
          Notepad and enjoy seamless access across all your devices.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
