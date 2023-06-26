import { EOL, cpus, homedir, userInfo, arch } from "os";

export const os = async (info) => {
  const handleCPUS = () => {
    const CPUS = cpus();
    console.log(`CPUS: ${CPUS.length}`);

    return CPUS.map((cpu) => ({
      Model: cpu.model,
      ClockRate: `${cpu.speed / 1000} GHz`,
    }));
  };

  switch (info) {
    case "--EOL":
      console.log(JSON.stringify(EOL));
      return;
    case "--cpus":
      console.log(handleCPUS());
      return;
    case "--homedir":
      console.log(homedir());
      return;
    case "--username":
      console.log(userInfo().username);
      return;
    case "--architecture":
      console.log(arch());
      return;

    default:
      console.log("Invalid input");
  }
}