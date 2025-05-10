export default function CareerGoals() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">My Career Goals</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4">My Vision</h2>
        <p className="text-gray-700 mb-4">
          I aspire to grow professionally and make a meaningful impact in my field. 
          This page outlines my career aspirations and the steps I'm taking to achieve them.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-pink-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-pink-600 mb-3">Short-term Goals</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Improve my technical skills in [specific area]</li>
            <li>Complete certification in [specific field]</li>
            <li>Take on more challenging projects at work</li>
            <li>Expand my professional network</li>
          </ul>
        </div>
        
        <div className="bg-pink-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-pink-600 mb-3">Long-term Goals</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Advance to a leadership position in my field</li>
            <li>Mentor others and share my knowledge</li>
            <li>Contribute to innovative projects that make a difference</li>
            <li>Achieve work-life balance that allows me to grow both professionally and personally</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4">My Journey So Far</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-pink-300 pl-4">
            <h3 className="text-lg font-medium text-pink-600">Education</h3>
            <p className="text-gray-700">
              [Your degree/certification] from [Institution]
            </p>
          </div>
          
          <div className="border-l-4 border-pink-300 pl-4">
            <h3 className="text-lg font-medium text-pink-600">Work Experience</h3>
            <p className="text-gray-700">
              [Your current/past role] at [Company]
            </p>
          </div>
          
          <div className="border-l-4 border-pink-300 pl-4">
            <h3 className="text-lg font-medium text-pink-600">Skills</h3>
            <p className="text-gray-700">
              [List your key professional skills]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
