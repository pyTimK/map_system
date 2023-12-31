interface MainLowerBgProps {
  height: number;
}

const MainLowerBg: React.FC<MainLowerBgProps> = ({ height }) => {
  return (
    <svg
      viewBox={`0 0 390 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 21.5C-8 20 -6.5 13.1667 -15.5 9V150.5H402.5C403.5 107.5 404.9 21.7 402.5 22.5C399.5 23.5 384 33.5 368.5 32C353 30.5 336.5 0 293.5 0C250.5 0 198.032 25 162.5 25C129 25 118 16 103.5 16C89 16 48.5 22.825 22 21.5Z"
        fill="#70BDF2"
      />
      <path
        d="M48 41.5C27.2 40.7 8.5 31.8333 -8 24V140.5C-8 150 409 150 409 150V33C406.667 38.1666 397.7 48.5 380.5 48.5C359 48.5 340 7.00001 283.5 10C227 13 213 34 184 38.5C154.355 43.1001 137.5 26.0714 106 28C78 29.7143 74 42.5 48 41.5Z"
        fill="#C1E3FF"
      />
      <path
        d="M57.5 47.5C35.5 47.5 0.666666 35.8333 -16 28V805.5H418.5V42C407.833 48.5 410 59 373.5 50.5C348.626 44.7075 346.5 18 287.5 18C228.5 18 225 38.5 175 40.5C145.5 41.68 145.5 35.5 114 35.5C82.5 35.5 85 47.5 57.5 47.5Z"
        fill="#FAFAFA"
      />
    </svg>
  );
};

export default MainLowerBg;
