import {useParams} from 'react-router-dom';

export default function MemberPage() {
  const params = useParams();

  return (
    <div>
      <h1>Member Page</h1>
      <p>Member Name: {params.memberName}</p>
    </div>
  );
}
