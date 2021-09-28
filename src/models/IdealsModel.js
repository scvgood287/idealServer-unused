const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

// Gender
const GenderSchema = new Schema({
  name: { type: String, required: true, unique: true, },
});
const Gender = model('Gender', GenderSchema);

// Group
const GroupSchema = new Schema({
  genderId: { type: ObjectId, ref: 'Gender', required: true, },
  name: { type: String, required: true, unique: true, },
});
const Group = model('Group', GroupSchema);

// GroupImage
const GroupImageSchema = new Schema({
  groupId: { type: ObjectId, ref: 'Group', required: true, },
  imageUrl: { type: String, unique: true, required: true, },
  name: { type: String, unique: true, required: true },
});
const GroupImage = model('GroupImage', GroupImageSchema);

// GroupImageRate
const GroupImageRateSchema = new Schema({
  groupImageId: { type: ObjectId, ref: 'GroupImage', required: true, },
  first: { type: Number, required: true, },
  entry: { type: Number, required: true, },
  win: { type: Number, required: true, },
  lose: { type: Number, required: true, },
});
const GroupImageRate = model('GroupImageRate', GroupImageRateSchema);

// GroupImageGameLog
const GroupImageGameLogSchema = new Schema({
  groupImageRateId: { type: ObjectId, ref:'GroupImageRate', required: true, },
  first: { type: Number, min: 0, max: 1, required: true, },
  entry: { type: Number, min: 0, max: 1, required: true, },
  win: { type: Number, min: 0, required: true, },
  lose: { type: Number, min: 0, max: 1, required: true, },
});
const GroupImageGameLog = model('GroupImageGameLog', GroupImageGameLogSchema);

// Member
const MemberSchema = new Schema({
  genderId: { type: ObjectId, ref: 'Gender', required: true, },
  groupId: { type: ObjectId, ref: 'Group', required: true, },
  name: { type: String, required: true, unique: true, },
});
const Member = model('Member', MemberSchema);

// MemberImage
const MemberImageSchema = new Schema({
  memberId: { type: ObjectId, ref: 'Member', required: true, },
  imageUrl: { type: String, unique: true, required: true, },
  name: { type: String, unique: true, required: true },
});
const MemberImage = model('MemberImage', MemberImageSchema);

// MemberImageRate
const MemberImageRateSchema = new Schema({
  memberImageId: { type: ObjectId, ref: 'MemberImage', required: true, },
  first: { type: Number, required: true, },
  entry: { type: Number, required: true, },
  win: { type: Number, required: true, },
  lose: { type: Number, required: true, },
});
const MemberImageRate = model('MemberImageRate', MemberImageRateSchema);

// MemberImageGameLog
const MemberImageGameLogSchema = new Schema({
  memberImageRateId: { type: ObjectId, ref:'MemberImageRate', required: true, },
  first: { type: Number, min: 0, max: 1, required: true, },
  entry: { type: Number, min: 0, max: 1, required: true, },
  win: { type: Number, min: 0, required: true, },
  lose: { type: Number, min: 0, max: 1, required: true, },
});
const MemberImageGameLog = model('MemberImageGameLog', MemberImageGameLogSchema);

module.exports = {
  Gender,
  Group,
  GroupImage,
  GroupImageRate,
  GroupImageGameLog,
  Member,
  MemberImage,
  MemberImageRate,
  MemberImageGameLog
};

// exports = async function() {
//   const DB = context.services.get("Cluster0").db("Cluster0");
  
//   const memberImageGameLogs = DB.collection("memberimagegamelogs");
//   const groupImageGameLogs = DB.collection("groupimagegamelogs");
  
//   const memberImageRates = DB.collection("memberimagerates");
//   const groupImageRates = DB.collection("groupimagerates");

//   const assembledMemberLogs = await memberImageGameLogs.aggregate([
//     {$group:
//       {
//         _id: "$memberImageRateId",
//         first: { $sum: "$first" },
//         entry: { $sum: "$entry" },
//         win: { $sum: "$win" },
//         lose: { $sum: "$lose" }
//       }
//     }
//   ]);
//   const assembledGroupLogs = await groupImageGameLogs.aggregate([
//     {$group:
//       {
//         _id: "$groupImageRateId",
//         first: { $sum: "$first" },
//         entry: { $sum: "$entry" },
//         win: { $sum: "$win" },
//         lose: { $sum: "$lose" }
//       }
//     }
//   ]);
  
//   const assembledMemberLogsArray = await assembledMemberLogs.toArray();
//   const assembledGroupLogsArray = await assembledGroupLogs.toArray();
  
//   await Promise.all(assembledMemberLogsArray.map(async ({ _id, first, entry, win, lose }) => {
//     await memberImageRates.updateOne({ _id }, { $inc: { first, entry, win, lose } });
//   }));
//   await Promise.all(assembledGroupLogsArray.map(async ({ _id, first, entry, win, lose }) => {
//     await groupImageRates.updateOne({ _id }, { $inc: { first, entry, win, lose } });
//   }));

//   await memberImageGameLogs.deleteMany({});
//   await groupImageGameLogs.deleteMany({});
// };