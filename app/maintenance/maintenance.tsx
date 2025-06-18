import Image from "next/image";
import Link from "next/link";

export default function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="max-w-md text-center space-y-6">
        <Image
          src="/maintenance/maintenance.webp"
          alt="Maintenance"
          width={300}
          height={300}
          className="mx-auto"
        />
        <h1 className="text-3xl font-bold">Site en maintenance</h1>
        <p className="text-lg">
          Mon portfolio se refait une beauté. Revenez plus tard, il sera plus
          beau qu'auparavant.
        </p>
        <Link
          href="https://github.com/michel-DC"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
        >
          Voir mon GitHub
        </Link>
      </div>
    </div>
  );
}
