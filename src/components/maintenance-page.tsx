import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 bg-black">
      <div className="max-w-md text-center space-y-6">
        <Image
          src="images/maintenance/maintenance.svg"
          alt="Maintenance"
          width={300}
          height={300}
          className="mx-auto"
        />
        <h1 className="text-3xl font-bold">Site en maintenance</h1>
        <p className="text-lg">
          Mon portfolio est actuellement en maintenance. Merci de votre
          patience, il sera bientôt de retour en ligne avec de nombreuses
          nouveautés.
        </p>
        <Button>
        <Link
          href="https://github.com/michel-DC"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir mon GitHub
        </Link>
        </Button>
      </div>
    </div>
  );
}
