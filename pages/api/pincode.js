export default function handler(req, res) {
  let pincodes = {
    422001: ["Nashik", "Maharashtra"],
    411038: ["Kothrud, Pune", "Maharashtra"],
    410221: ["Thobrevadi, Panvel, Raigad", "Maharashtra"],
  };

  res.status(200).json(pincodes);
}
