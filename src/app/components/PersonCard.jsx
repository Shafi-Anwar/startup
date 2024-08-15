import Link from 'next/link';

function PersonCard({ person }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className='text-xl font-bold'>{person.name}</h2>
      <p className='text-gray-600'>{person.phone}</p>
      <p className='text-gray-600'>{new Date(person.dateJoined).toLocaleDateString()}</p>
      <p className={`text-gray-600 ${person.paymentDone ? 'text-green-500' : 'text-red-500'}`}>
        {person.paymentDone ? 'Payment Done' : 'Payment Pending'}
      </p>
      {person.url ? (
        <Link href={person.url} className="mt-4 text-blue-500">
          View Details
        </Link>
      ) : (
        <p>No URL available</p>
      )}
    </div>
  );
}

export default PersonCard;
