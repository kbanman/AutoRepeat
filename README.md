***Usage**

**HTML**

	<form>
		<table>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
			</tr>
			<tr class="autorepeat">
				<td><input type="text" name="first_name" /></td>
				<td><input type="text" name="last_name" /></td>
			</tr>
		</table>
	</form>


**Javascript**

	$(document).ready(function() {
	    
	    // Initialize the plugin
	    $('#repeating_fieldset').autoRepeat();
    
	    // Manually add a repetition
	    $('#repeating_fieldset').data('autoRepeat').repeat();
    
	    // All options
	    $('#repeating_fieldset').autoRepeat({
	    	more_text: 'Add Another',
			debug: true,
			onAdd: function($newset) {
				console.log('Adding new repetition', $newset);
			}
	    });
	     
	});


**Resulting Markup**

	<form>
		<table>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
			</tr>
			<tr class="autorepeat">
				<td><input type="text" name="first_name_1" /></td>
				<td><input type="text" name="last_name_1" /></td>
			</tr>
			<div class="autoRepeat-more_button">
				<button>Add Another</button>
			</div>
		</table>
	</form>


**TODO**

 - Customizable increment style
 - Ability to remove repetitions
 - Automatically repeat fields once the first are filled in
 - Optional animations for adding/removing





